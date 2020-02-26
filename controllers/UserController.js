const User = require('../models').User;
const sequelize = require('../models').sequelize;
const errorCodes = require('../config/errorCodes');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

UserController = {
    index(req, res) {
        return User.findAll()
            .then(users => res.json({ Users: users }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        User.findOne({ where: { Oid: oid } }).then(user => {
            if (user) {
                res.json({ User: user })
            } else {
                res.status(500).json(errorCodes.UserNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let userData = req.body.User;
        let roleId = req.body.RoleId ? req.body.RoleId : 1;
        sequelize.transaction(transaction => {
            return User.create(userData, { transaction }).then(user => {
                return user.addRole(roleId, { transaction }).then(() => {
                    delete user.dataValues.password;
                    res.json({ User: user });
                });
            });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const userData = req.body.User;
        User.findOne({ where: { Oid: req.params.Oid } }).then(user => {
            if (user) {
                user.update(userData).then(userUpdated => {
                    res.json({ User: userUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {

    },

    getEmployee(req, res) {
        User.findOne({ where: { Oid: req.params.Oid } }).then(user => {
            if (user) {
                user.getEmployee()
                    .then(employee => {
                        res.json({ Employee: employee ? employee : {} })
                    })
                    .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    async getEvaluations(req, res) {
        User.findOne({ where: { Oid: req.params.Oid } }).then(async user => {
            if (user) {
                const employee = await user.getEmployee();
                const evaluations = !employee ? [] : await employee.getEvaluations({
                    through: {
                        statusEvaluationId: {
                            [Op.not]: 3
                        }
                    }
                });
                res.json({ Evaluations: evaluations });
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    }

};

module.exports = UserController;