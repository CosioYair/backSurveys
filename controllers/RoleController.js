const Role = require('../models').Role;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const errorCodes = require('../config/errorCodes');

RoleController = {
    index(req, res) {
        return Role.findAll()
            .then(roles => res.json({ Roles: roles }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {

    },

    create(req, res) {

    },

    update(req, res) {

    },

    delete(req, res) {

    },

    userRoles(req, res) {
        return Role.findAll({
            where: {
                id: {
                    [Op.gt]: 3
                }
            }
        })
            .then(roles => res.json({ Roles: roles }))
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};

module.exports = RoleController;