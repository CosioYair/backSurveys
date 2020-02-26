const Conditional = require('../models').Conditional;

ConditionalController = {
    index(req, res) {
        return Conditional.findAll()
            .then(conditionals => res.json({ Conditionals: conditionals }))
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

module.exports = ConditionalController;