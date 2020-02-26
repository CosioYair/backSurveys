const jwt = require('jsonwebtoken');
const sequelize = require('../models').sequelize;
const StatusEvaluation = require('../models').StatusEvaluation;
var dotenv = require('dotenv').config();


StatusEvaluationController = {
    index(req, res) {
        StatusEvaluation.findAll().then(StatusEvaluation => {
            res.json({ StatusEvaluation });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    show(req, res) {
        const parametro = req.params.id;
        const modelo = req.body.StatusEvaluation;
        StatusEvaluation.findByPk(parametro).then(StatusEvaluation => {
            res.json({ StatusEvaluation });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        const modelo = req.body.StatusEvaluation;
        return StatusEvaluation.create(modelo).then(StatusEvaluation => {
            res.json({ StatusEvaluation });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const parametro = req.params.id;
        const modelo = req.body.StatusEvaluation;
        return StatusEvaluation.update(modelo, { where: { "Id": parametro } }).then(StatusEvaluation => {
            res.json({ StatusEvaluation });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const parametro = req.params.id;
        return StatusEvaluation.destroy({ where: { "Id": parametro } }).then(StatusEvaluation => {
            res.json({ StatusEvaluation });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};


module.exports = StatusEvaluationController;