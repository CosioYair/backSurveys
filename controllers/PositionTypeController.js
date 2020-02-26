const PositionType = require('../models').PositionType;
const errorCodes = require('../config/errorCodes');

PositionTypeController = {
    index(req, res) {
        return PositionType.findAll()
            .then(positionTypes => res.json({ PositionTypes: positionTypes }))
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

module.exports = PositionTypeController;