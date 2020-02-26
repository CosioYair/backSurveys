const Dimension = require('../models').Dimension;
const errorCodes = require('../config/errorCodes');
const sequelize = require('../models').sequelize;

DimensionController = {
    index(req, res) {
        return Dimension.findAll()
            .then(dimensions => res.json({ Dimensions: dimensions }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        Dimension.findOne({ where: { Oid: oid } }).then(dimension => {
            if (dimension) {
                res.json({ Dimension: dimension })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let dimensionData = req.body.Dimension;
        sequelize.transaction(transaction => {
            return Dimension.create(dimensionData, { transaction }).then(dimension => {
                res.json({ Dimension: dimension });
            });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const dimensionData = req.body.Dimension;
        Dimension.findOne({ where: { Oid: req.params.Oid } }).then(dimension => {
            if (dimension) {
                dimension.update(dimensionData).then(dimensionUpdated => {
                    res.json({ Dimension: dimensionUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const oid = req.params.Oid;
        Dimension.findOne({ where: { Oid: oid } }).then(dimension => {
            if (dimension) {
                dimension.destroy().then(() => {
                    res.json({ Dimension: dimension })
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));;
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};


module.exports = DimensionController;