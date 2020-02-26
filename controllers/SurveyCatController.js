const SurveyCat = require('../models').SurveyCat;
const errorCodes = require('../config/errorCodes');

SurveyCatController = {
    
    index(req, res) {
        SurveyCat.findAll().then(surveyCats => {
            res.json({ SurveyCats: surveyCats });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
    
    show(req, res) {
        const parametro = req.params.oid;
        const modelo = req.body.SurveyCat;
        SurveyCat.findByPk(parametro).then(surveyCat => {
            res.json({ SurveyCat: surveyCat });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
    
    create(req, res) {
        const modelo = req.body.SurveyCat;
        return SurveyCat.create(modelo).then(surveyCat => {
            res.json({ SurveyCat: surveyCat });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
    
    update(req, res) {
        const surveyCatData = req.body.SurveyCat;
        SurveyCat.findOne({ where: { Oid: req.params.oid } }).then(surveyCat => {
            if (surveyCat) {
                surveyCat.update(surveyCatData).then(surveyCatUpdated => {
                    res.json({ SurveyCat: surveyCatUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
    
    delete(req, res) {
        const parametro = req.params.oid;
        return SurveyCat.destroy({ where: { "Oid": parametro } }).then(surveyCat => {
            res.json({ SurveyCat: surveyCat });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    updateSurveySections(req, res) {
        const surveySections = req.body.SurveySections;
        SurveyCat.findOne({ where: { Oid: req.params.Oid } }).then(surveyCat => {
            if (surveyCat) {
                surveyCat.updateSurveySections(surveySections).then(updatedSurveySections => {
                    res.json({ SurveySections: updatedSurveySections });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getSurveySections(req, res) {
        SurveyCat.findOne({ where: { Oid: req.params.Oid } }).then(surveyCat => {
            if (surveyCat) {
                surveyCat.getSurveySections().then(surveySections => {
                    res.json({ SurveySections: surveySections });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};

module.exports = SurveyCatController;