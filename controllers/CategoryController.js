const Category = require('../models').Category;
const errorCodes = require('../config/errorCodes');
const sequelize = require('../models').sequelize;

CategoryController = {
    index(req, res) {
        return Category.findAll()
            .then(categories => res.json({ Categories: categories }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        Category.findOne({ where: { Oid: oid } }).then(category => {
            if (category) {
                res.json({ Category: category })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let categoryData = req.body.Category;
        sequelize.transaction(transaction => {
            return Category.create(categoryData, { transaction }).then(category => {
                res.json({ Category: category });
            });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const categoryData = req.body.Category;
        Category.findOne({ where: { Oid: req.params.Oid } }).then(category => {
            if (category) {
                category.update(categoryData).then(categoryUpdated => {
                    res.json({ Category: categoryUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const oid = req.params.Oid;
        Category.findOne({ where: { Oid: oid } }).then(category => {
            if (category) {
                category.destroy().then(() => {
                    res.json({ Category: category })
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));;
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};


module.exports = CategoryController;