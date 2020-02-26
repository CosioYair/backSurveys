const MailController = require('./MailController');
const errorCodes = require('../config/errorCodes');
const dotenv = require('dotenv').config();

SharedController = {

    setFieldErrors(err) {
        let responseErrors = {};
        let errors = [];
        errors = err.errors ? err.errors : [{ path: "generalError", message: err }];
        errors.map(error => {
            switch (error.path) {
                case 'email':
                    if (error.message.match(/is already in use/)) {
                        responseErrors[error.path] = errorCodes.EmailTaken;
                    } else {
                        responseErrors[error.path] = error.message
                    }
                    break;
                case 'Oid':
                    responseErrors['email'] = errorCodes.EmailTaken;
                    break;

                default:
                    break;
            }
        });
        return responseErrors;
    },

    async getAuthUserInfo(user) {
        const privileges = await user.getPrivileges();
        const company = await user.getCompany();
        const formatedPrivileges = [];
        let subscriptionId;
        let subscriptionPrivilege;
        if (privileges.length > 0) {
            privileges.forEach(privilege => {
                formatedPrivileges.push({
                    id: privilege.id,
                    name: privilege.name,
                    code: privilege.code
                });
            });
        }
        subscriptionPrivilege = privileges.find(privilege => privilege.code === 'SS');
        if (company && subscriptionPrivilege) {
            subscriptionId = company.paypalSubscriptionId;
        }
        return {
            Oid: user.Oid,
            privileges: formatedPrivileges,
            subscriptionId
        };
    },

    hashPassword(password) {
        const bcrypt = require('bcryptjs');
        return bcrypt.hashSync(password, 10);
    },

    mergeObjects(objectsArray) {
        let merge = {};
        objectsArray.map(object => {
            merge = { ...merge, ...object };
        });
        return merge;
    },

    catchGeneralDbError(err) {
        console.log("---------------");
        console.log(err);
        console.log("---------------");
        if (Object.keys(err).length === 0) {
            return [{ ...errorCodes.CustomMessage, Message: err.message }]
        }
        else if (err.original) {
            let customError;
            let customErrorCode;
            const foreingKeyEng = err.original.detail.match(/\b(?:Key|is not present in table)\b/gi);
            const foreingKeyEsp = err.original.detail.match(/\b(?:La llave|no está presente en la tabla)\b/gi);
            if (foreingKeyEng || foreingKeyEsp) {
                const foreingKey = foreingKeyEng ? foreingKeyEng.length === 2 : foreingKeyEsp.length === 2;
                const constraint = err.original.constraint.split('_')[1];
                if (foreingKey) {
                    customErrorCode = { ...errorCodes.InvalidForeignkey };
                    customErrorCode.Field = constraint;
                    customError = customErrorCode;
                }
            } else {
                const errorCode = err.original.code;
                const errorColumn = err.original.column;
                switch (errorCode) {
                    case '23502':
                        customError = { ...errorCodes.InvalidForeignkey, Field: errorColumn };
                        break;

                    default:
                        break;
                }
            }
            if (!customError) {
                customError = errorCodes.SomethingWrong;
            }
            return [customError];
        } else {
            const errors = err.errors;
            let customErrors = errors.map(dbError => {
                let customError;
                switch (dbError.validatorKey) {
                    case 'is_null':
                        customError = { ...errorCodes.NullField };
                        customError.Field = dbError.path;
                        break;
                    case 'isUnique':
                        if (dbError.message.match(/email/)) {
                            customError = { ...errorCodes.EmailTaken };
                        } else {
                            customError = { ...errorCodes.UniqueField };
                        }
                        customError.Field = dbError.path;
                        break;

                    default:
                        customError = { ...errorCodes.SomethingWrong };
                        break;
                }
                return customError;
            });
            return customErrors;
        }
    },

    async setHasManyRecors(instance, updateRecords, getMethod, createMethod, primaryKey = 'Oid') {
        const currentRecords = await instance[getMethod]();
        const deleteRecords = SharedController.getRecordsToDelete(currentRecords, updateRecords, primaryKey);
        await Promise.all(deleteRecords.map(deleteRecord => deleteRecord.destroy()));
        if (updateRecords.length === 0) {
            return updateRecords;
        }
        return await Promise.all(updateRecords.map(async updateRecord => {
            if (updateRecord[primaryKey]) {
                let currentRecord = await instance[getMethod]({ where: { [primaryKey]: updateRecord[primaryKey] } });
                if (currentRecord.length > 0) {
                    const updateKeys = Object.keys(updateRecord);
                    currentRecord = currentRecord[0];
                    updateKeys.map(key => currentRecord[key] = updateRecord[key]);
                    return await currentRecord.save();
                }
            }
            delete updateRecord[primaryKey];
            return instance[createMethod](updateRecord);
        })).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    async setBelongsToManyRecors(instance, updateRecords, getMethod, addMethod, subInstance, mainInstance, primaryKey = 'Oid') {
        const currentRecords = await instance[getMethod]().map(currentRecord => currentRecord[subInstance]);
        const deleteRecords = SharedController.getRecordsToDelete(currentRecords, updateRecords, primaryKey);
        await Promise.all(deleteRecords.map(deleteRecord => deleteRecord.destroy()));
        return await Promise.all(updateRecords.map(updateRecord => {
            let through = { ...updateRecord };
            updateRecord[primaryKey] ? delete through[primaryKey] : delete through[mainInstance];
            return instance[addMethod](updateRecord[through[primaryKey] ? through[primaryKey] : mainInstance], { through })
                .then(newRecords => {
                    if (newRecords[0]) {
                        if (newRecords[0][0][primaryKey]) {
                            return newRecords[0][0]
                        }
                    }
                    return updateRecord
                });
        })).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getRecordsToDelete(currentObjs, updateObjs, key) {
        let deleteRecords = [];
        currentObjs.map(currentObj => {
            const found = updateObjs.find(updateObj => updateObj[key] == currentObj[key]);
            if (!found) {
                deleteRecords.push(currentObj);
            }
        });
        return deleteRecords;
    },

    sendManyMails(emails, emailSubject, emailMessage) {
        emails.map(email => {
            MailController.sendMail(email, emailSubject, emailMessage);
        });
    },

    validateExpDateToken(exp_date) {
        let today = new Date();
        exp_date = new Date(exp_date);
        return today <= exp_date;
    },

    getFactorIntegracion(aniosAntiguedad, diasAguinaldo, porcentajePrima) {
        var diasVacaciones = 6;
        if (aniosAntiguedad == 0)
            diasVacaciones = 6;
        else if (aniosAntiguedad == 1)
            diasVacaciones = 8;
        else if (aniosAntiguedad == 2)
            diasVacaciones = 10;
        else if (aniosAntiguedad == 3)
            diasVacaciones = 12;
        else if (aniosAntiguedad >= 4 && aniosAntiguedad < 9)
            diasVacaciones = 14;
        else if (aniosAntiguedad >= 9)
            diasVacaciones = 16;

        var factorAguinaldo = diasAguinaldo / 365;
        var factorPrima = (diasVacaciones * (porcentajePrima / 100)) / 365;
        factorIntegracion = 1 + factorAguinaldo + factorPrima;
        factorIntegracion = Math.Truncate(10000 * factorIntegracion) / 10000;//Math.Round(factorIntegracion, 4);
        return factorIntegracion;
    },

    generateUuidV4() {
        const uuidv1 = require('uuid/v1');
        return "uuidv1().toString()";
    },

    getDateTime(date) {
        const startedAtDate = date.toString();
        const time = startedAtDate.split(' ')[4].split(':');
        const timeStampHours = parseInt(time[0], null) * 60 * 60;
        const timeStampMinutes = parseInt(time[1], null) * 60;
        return timeStampHours + timeStampMinutes;
    }

};

module.exports = SharedController;