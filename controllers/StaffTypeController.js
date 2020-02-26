const StaffType = require('../models').StaffType;
const errorCodes = require('../config/errorCodes');

StaffTypeController = {
    index(req, res) {
        return StaffType.findAll()
            .then(staffTypes => res.json({ StaffTypes: staffTypes }))
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

module.exports = StaffTypeController;