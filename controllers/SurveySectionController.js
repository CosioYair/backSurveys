const SurveySection = require('../models').SurveySection;
const errorCodes = require('../config/errorCodes');
const sequelize = require('../models').sequelize;

SurveySectionController = {
    index(req, res) {
        return SurveySection.findAll()
            .then(surveySections => res.json({ SurveySections: surveySections }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        SurveySection.findOne({ where: { Oid: oid } }).then(surveySection => {
            if (surveySection) {
                res.json({ SurveySection: surveySection })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let surveySectionData = req.body.SurveySection;
        sequelize.transaction(transaction => {
            return SurveySection.create(surveySectionData, { transaction }).then(surveySection => {
                res.json({ SurveySection: surveySection });
            });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const surveySectionData = req.body.SurveySection;
        SurveySection.findOne({ where: { Oid: req.params.Oid } }).then(surveySection => {
            if (surveySection) {
                surveySection.update(surveySectionData).then(surveySectionUpdated => {
                    res.json({ SurveySection: surveySectionUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const oid = req.params.Oid;
        SurveySection.findOne({ where: { Oid: oid } }).then(surveySection => {
            if (surveySection) {
                surveySection.destroy().then(() => {
                    res.json({ SurveySection: surveySection })
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));;
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    updateQuestions(req, res) {
        const questions = req.body.Questions;
        SurveySection.findOne({ where: { Oid: req.params.Oid } }).then(surveySection => {
            if (surveySection) {
                surveySection.updateQuestions(questions).then(updatedQuestions => {
                    res.json({ Questions: updatedQuestions });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getQuestions(req, res) {
        SurveySection.findOne({ where: { Oid: req.params.Oid } }).then(surveySection => {
            if (surveySection) {
                surveySection.getQuestions().then(questions => {
                    res.json({ Questions: questions });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};


module.exports = SurveySectionController;