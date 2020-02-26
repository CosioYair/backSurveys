const SurveyType = require('../models').SurveyType;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

SurveyTypeController = {
    index(req, res) {
        return SurveyType.findAll()
            .then(surveyTypes => res.json({ SurveyTypes: surveyTypes }))
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

};

module.exports = SurveyTypeController;