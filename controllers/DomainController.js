const Domain = require('../models').Domain;
const errorCodes = require('../config/errorCodes');
const sequelize = require('../models').sequelize;

DomainController = {
    index(req, res) {
        return Domain.findAll()
            .then(domains => res.json({ Domains: domains }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        Domain.findOne({ where: { Oid: oid } }).then(domain => {
            if (domain) {
                res.json({ Domain: domain })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let domainData = req.body.Domain;
        sequelize.transaction(transaction => {
            return Domain.create(domainData, { transaction }).then(domain => {
                res.json({ Domain: domain });
            });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const domainData = req.body.Domain;
        Domain.findOne({ where: { Oid: req.params.Oid } }).then(domain => {
            if (domain) {
                domain.update(domainData).then(domainUpdated => {
                    res.json({ Domain: domainUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const oid = req.params.Oid;
        Domain.findOne({ where: { Oid: oid } }).then(domain => {
            if (domain) {
                domain.destroy().then(() => {
                    res.json({ Domain: domain })
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));;
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};


module.exports = DomainController;