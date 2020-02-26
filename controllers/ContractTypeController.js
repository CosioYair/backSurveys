const ContractType = require('../models').ContractType;
const errorCodes = require('../config/errorCodes');

ContractTypeController = {
    index(req, res) {
        return ContractType.findAll()
            .then(contractTypes => res.json({ ContractTypes: contractTypes }))
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

module.exports = ContractTypeController;