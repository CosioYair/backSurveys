const jwt = require('jsonwebtoken');
const sequelize = require('../models').sequelize;
const QuestionType = require('../models').QuestionType;
var dotenv = require('dotenv').config();


QuestionTypeController = {
    index(req, res) {
        QuestionType.findAll().then(questionType => {
            res.json({ questionType });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    show(req, res) {
        const parametro = req.params.id;
        const modelo = req.body.QuestionType;
        QuestionType.findByPk(parametro).then(questionType => {
            res.json({ questionType });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        const modelo = req.body.QuestionType;
        return QuestionType.create(modelo).then(questionType => {
            res.json({ questionType });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const parametro = req.params.id;
        const modelo = req.body.QuestionType;
        return QuestionType.update(modelo, { where: { "Id": parametro }, }).then(questionType => {
            res.json({ questionType });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const parametro = req.params.id;
        return QuestionType.destroy({ where: { "Id": parametro } }).then(questionType => {
            res.json({ questionType });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};

module.exports = QuestionTypeController;