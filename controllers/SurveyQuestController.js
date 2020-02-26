const jwt = require('jsonwebtoken');
const sequelize = require('../models').sequelize;
const SurveyQuest = require('../models').SurveyQuest;
var dotenv = require('dotenv').config();

SurveyQuestController = {

    index(req, res) {
        SurveyQuest.findAll().then(surveyQuest => {
            res.json({ surveyQuest });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    show(req, res) {
        const parametro = req.params.oid;
        const modelo = req.body.SurveyQuest;
        SurveyQuest.findByPk(parametro).then(surveyQuest => {
            res.json({ surveyQuest });
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        const modelo = req.body.SurveyQuest;
        sequelize.transaction(async transaction => {
            return SurveyQuest.create(modelo, { transaction }).then(surveyQuest => {
                res.json({ surveyQuest });
            })
        })
            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const parametro = req.params.oid;
        const modelo = req.body.SurveyQuest;
        return SurveyQuest.update(modelo, { where: { "Oid": parametro } }).then(surveyQuest => {
            res.json({ surveyQuest });
        })

            .catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const parametro = req.params.oid;
        return SurveyQuest.destroy({ where: { "Oid": parametro } }).then(surveyQuest => {
            res.json({ surveyQuest });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};

module.exports = SurveyQuestController;