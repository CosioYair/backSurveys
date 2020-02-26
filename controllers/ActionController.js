const User = require('../models').User;
const UserAction = require('../models').UserAction;
const sequelize = require('../models').sequelize;
const MailController = require('./MailController');
const errorCodes = require('../config/errorCodes');
const messages = require('../config/messages');

ActionController = {
    index(req, res) {

    },

    show(req, res) {

    },

    create(req, res) {

    },

    update(req, res) {

    },

    delete(req, res) {

    },

    async validateToken(req, res) {
        let token = req.body.Token ? req.body.Token : "";
        let userAction = await UserAction.findOne({ where: { token } });
        if (userAction) {
            let validExpDate = ActionController.validateExpDateToken(userAction.expDate);
            if (userAction.active == 1 && validExpDate) {
                res.status(200).send("Success");
            } else {
                sequelize.transaction(async transaction => {
                    return userAction.update({ active: false }, { transaction })
                        .then(() => res.status(500).send(!validExpDate ? errorCodes.ExpiredToken : errorCodes.InvalidToken));
                }).catch(() => res.status(500).json(errorCodes.SomethingWrong));
            }
        }
        else {
            res.status(500).send(errorCodes.InvalidToken);
        }
    },

    validateExpDateToken(exp_date) {
        let today = new Date();
        exp_date = new Date(exp_date);
        return today <= exp_date;
    },

    async newActionByToken(req, res) {
        const url = req.body.Url;
        const token = req.body.Token;
        const userAction = await UserAction.findOne({ where: { token } });
        if (userAction) {
            let user = await User.findOne({ where: { Oid: userAction.userOid } });
            let actionResult = await ActionController.addUserActionByType(user, userAction.actionId, url);
            res.status(actionResult.status).json(actionResult.content);
        } else {
            res.status(500).json([errorCodes.InvalidToken]);
        }
    },

    async newActionByUserOid(req, res) {
        const url = req.body.Url;
        const actionId = req.body.ActionId;
        const userOid = req.body.UserOid;
        let user = await User.findOne({ where: { Oid: userOid } });
        if (user) {
            let actionResult = await ActionController.addUserActionByType(user, actionId, url);
            res.status(actionResult.status).json(actionResult.content);
        } else {
            res.status(500).json([errorCodes.UserNotFound]);
        }
    },

    async newActionByUserEmail(req, res) {
        const url = req.body.Url;
        const email = req.body.Email;
        const actionId = req.body.ActionId;
        const user = await User.findOne({ where: { email } });
        if (user) {
            let actionResult = await ActionController.addUserActionByType(user, actionId, url);
            res.status(actionResult.status).json(actionResult.content);
        } else {
            res.status(500).json([errorCodes.RecordNotFound]);
        }
    },

    async addUserActionByType(user, actionId, hostUrl = null) {
        let actionResult = {
            status: 200,
            content: ""
        };
        if (user) {
            switch (actionId) {
                case 1:
                    actionResult.content = await ActionController.addNewEmailAction(user, actionId, messages.mails.emailConfirmationSubject, messages.mails.emailConfirmationMessage, hostUrl);
                    break;
                case 3:
                    actionResult.content = await ActionController.addNewEmailAction(user, actionId, messages.mails.passwordRecoverSubject, messages.mails.passwordRecoverMessage);
                    break;

                default:
                    actionResult.status = 500;
                    actionResult.content = errorCodes.InvalidAction;
                    break;
            }
        } else {
            actionResult.status = 500;
            actionResult.content = errorCodes.UserNotFound;
        }
        return actionResult;
    },

    async addNewEmailAction(user, actionId, emailSubject, emailMessage, hostUrl = null) {
        return ActionController.createNewUserAction(user, actionId, hostUrl).then(userAction => {
            let token = userAction.dataValues.token;
            const bodyMessage = !hostUrl ? `${emailMessage} ${token}` : `${emailMessage} ${hostUrl}?Token=${token}`;
            MailController.sendMail(user.email, emailSubject, bodyMessage);
            return { token };
        });
    },

    async createNewUserAction(user, actionId, hostUrl) {
        const token = !hostUrl ? await user.generateLocalTfaToken() : await SharedController.generateUuidV4();
        const oldUserAction = await ActionController.getActiveUserAction(user.Oid, actionId)
        let expDate = new Date();
        expDate.setHours(expDate.getHours() + 1);
        if (oldUserAction) {
            await oldUserAction.update({ active: false });
        }
        return UserAction.create({
            userOid: user.Oid,
            actionId,
            expDate,
            token,
            active: true
        });
    },

    getActiveUserAction(userOid, actionId) {
        return UserAction.findOne({
            where: {
                userOid,
                actionId,
                active: true
            }
        }).then(userAction => userAction);
    },

    async confirmToken(req, res) {
        const token = req.body.Token;
        const payload = req.body.Payload;
        UserAction.findOne({ where: { token, active: true } })
            .then(async userAction => {
                if (userAction) {
                    switch (userAction.actionId) {
                        case 3:
                            const user = await User.findOne({ where: { Oid: userAction.userOid } });
                            user.update({ password: SharedController.hashPassword(payload.password) })
                                .then(async () => {
                                    await userAction.update({ active: false });
                                    return res.json({});
                                }).catch(() => res.status(500).send(errorCodes.SomethingWrong));
                            break;

                        default:
                            break;
                    }
                }
                else {
                    res.status(500).send([errorCodes.InvalidToken]);
                }
            });
    },

};

module.exports = ActionController;