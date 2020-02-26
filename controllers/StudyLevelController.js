const StudyLevel = require('../models').StudyLevel;
const errorCodes = require('../config/errorCodes');

StudyLevelController = {
    index(req, res) {
        return StudyLevel.findAll()
            .then(studyLevels => res.json({ StudyLevels: studyLevels }))
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

module.exports = StudyLevelController;