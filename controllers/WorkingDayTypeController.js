const WorkingDayType = require('../models').WorkingDayType;
const errorCodes = require('../config/errorCodes');

WorkingDayTypeController = {
    index(req, res) {
        return WorkingDayType.findAll()
            .then(workingDayTypes => res.json({ WorkingDayTypes: workingDayTypes }))
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

module.exports = WorkingDayTypeController;