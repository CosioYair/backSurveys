const CivilStatus = require('../models').CivilStatus;
const errorCodes = require('../config/errorCodes');

CivilStatusController = {
    index(req, res) {
        return CivilStatus.findAll()
            .then(civilStatuses => res.json({ CivilStatuses: civilStatuses }))
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

module.exports = CivilStatusController;