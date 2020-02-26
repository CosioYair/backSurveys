const sequelize = require('../models').sequelize;
const EmployeeEvaluation = require('../models').EmployeeEvaluation;

EmployeeEvaluationController = {

    index(req, res) {
        return EmployeeEvaluation.findAll()
            .then(employeeEvaluations => res.json({ EmployeeEvaluations: employeeEvaluations }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        EmployeeEvaluation.findOne({ where: { Oid: oid } }).then(employeeEvaluation => {
            if (employeeEvaluation) {
                res.json({ EmployeeEvaluation: employeeEvaluation })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let employeeEvaluationData = req.body.EmployeeEvaluation;
        sequelize.transaction(transaction => {
            return EmployeeEvaluation.create(employeeEvaluationData, { transaction }).then(employeeEvaluation => {
                res.json({ EmployeeEvaluation: employeeEvaluation });
            });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const employeeEvaluationData = req.body.EmployeeEvaluation;
        EmployeeEvaluation.findOne({ where: { Oid: req.params.Oid } }).then(employeeEvaluation => {
            if (employeeEvaluation) {
                employeeEvaluation.update(employeeEvaluationData).then(employeeEvaluationUpdated => {
                    res.json({ EmployeeEvaluation: employeeEvaluationUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const oid = req.params.Oid;
        EmployeeEvaluation.findOne({ where: { Oid: oid } }).then(employeeEvaluation => {
            if (employeeEvaluation) {
                employeeEvaluation.destroy();
                res.json({ EmployeeEvaluation: employeeEvaluation })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

};

module.exports = EmployeeEvaluationController;