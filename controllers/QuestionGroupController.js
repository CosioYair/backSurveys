const jwt = require('jsonwebtoken');
const sequelize = require('../models').sequelize;
const QuestionGroup = require('../models').QuestionGroup;
var dotenv = require('dotenv').config();

QuestionGroupController = {
    //Regresa todos los registros del modelo
    index(req, res) {
        QuestionGroup.findAll().then(QuestionGroup => {
            res.json({ QuestionGroup });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
    //obtiene un registro 
    show(req, res) {
        const parametro = req.params.oid;
        const modelo = req.body.QuestionGroup;
        QuestionGroup.findByPk(parametro).then(QuestionGroup => {
            res.json({ QuestionGroup });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
    //Crea un nuevo registro
    create(req, res) {
        const modelo = req.body.QuestionGroup;
        sequelize.transaction(async transaction => {
            return QuestionGroup.create(modelo, { transaction }).then(QuestionGroup => {
                res.json({ QuestionGroup });
            })
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
    //Actualiza un registro en especifico
    update(req, res) {
        const parametro = req.params.oid;
        const modelo = req.body.QuestionGroup;
        sequelize.transaction(async transaction => {
            return QuestionGroup.update(modelo, { where: { "Oid": parametro } }, { transaction }).then(QuestionGroup => {
                res.json({ QuestionGroup });
            })
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
    //Borra un registro en específico
    delete(req, res) {
        const parametro = req.params.oid;
        sequelize.transaction(async transaction => {
            return QuestionGroup.destroy({ where: { "Oid": parametro } }, { transaction }).then(QuestionGroup => {
                res.json({ QuestionGroup });
            })
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

};

module.exports = QuestionGroupController;