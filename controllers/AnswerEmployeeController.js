const jwt = require('jsonwebtoken');
const sequelize = require('../models').sequelize;
const AnswerEmployee = require('../models').AnswerEmployee;
var dotenv = require('dotenv').config();

AnswerEmployeeController = {

    index(req, res) {
        AnswerEmployee.findAll().then(AnswerEmployee => {
            res.json({ AnswerEmployee });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    show(req, res) {
        const parametro = req.params.oid;
        const modelo = req.body.AnswerEmployee;
        AnswerEmployee.findByPk(parametro).then(AnswerEmployee => {
            // AnswerEmployee.setEvaluation(AnswerEmployee.evaluationId);
            res.json({ AnswerEmployee });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        const modelo = req.body.AnswerEmployee;
        sequelize.transaction(async transaction => {
            return AnswerEmployee.create(modelo, { transaction }).then(AnswerEmployee => {
                res.json({ AnswerEmployee });
            })
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const parametro = req.params.oid;
        const modelo = req.body.AnswerEmployee;
        sequelize.transaction(async transaction => {
            return AnswerEmployee.update(modelo, { where: { "Oid": parametro } }, { transaction }).then(AnswerEmployee => {
                res.json({ AnswerEmployee });
            })
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const parametro = req.params.oid;
        sequelize.transaction(async transaction => {
            return AnswerEmployee.destroy({ where: { "Oid": parametro } }, { transaction }).then(AnswerEmployee => {
                res.json({ AnswerEmployee });
            })
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

};

module.exports = AnswerEmployeeController;