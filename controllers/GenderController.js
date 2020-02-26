const Gender = require('../models').Gender;
const errorCodes = require('../config/errorCodes');

GenderController = {
    index(req, res) {
        return Gender.findAll()
            .then(genders => res.json({ Genders: genders }))
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

module.exports = GenderController;