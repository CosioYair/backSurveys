const Evaluation = require('../models').Evaluation;
const sequelize = require('../models').sequelize;
const errorCodes = require('../config/errorCodes');

EvaluationController = {
    index(req, res) {
        return Evaluation.findAll()
            .then(evaluations => res.json({ Evaluations: evaluations }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        Evaluation.findOne({ where: { Oid: oid } }).then(evaluation => {
            if (evaluation) {
                res.json({ Evaluation: evaluation })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        const evaluationData = req.body.Evaluation;
        return Evaluation.create(evaluationData).then(async evaluation => {
            res.json({ Evaluation: evaluation });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const evaluationData = req.body.Evaluation;
        Evaluation.findOne({ where: { Oid: req.params.Oid } }).then(evaluation => {
            if (evaluation) {
                evaluation.update(evaluationData).then(evaluationUpdated => {
                    res.json({ Evaluation: evaluationUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const oid = req.params.Oid;
        Evaluation.findOne({ where: { Oid: oid } }).then(evaluation => {
            if (evaluation) {
                evaluation.destroy().then(() => {
                    res.json({ Evaluation: evaluation })
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));;
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    setRandomEmployees(req, res) {
        const oid = req.params.Oid;
        const employeesNumber = req.body.EmployeesNumber;
        Evaluation.findOne({ where: { Oid: oid } }).then(async evaluation => {
            if (evaluation) {
                if (evaluation.active) {
                    res.status(500).json(errorCodes.RecordAlreadyActive);
                } else {
                    const employeeEvaluations = await evaluation.setRandomEmployees(employeesNumber);
                    res.json({ EmployeeEvaluations: employeeEvaluations });
                }
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getLayout(req, res) {
        const oid = req.params.Oid;
        Evaluation.findOne({ where: { Oid: oid } }).then(async evaluation => {
            if (evaluation) {
                const evaluationLayout = await evaluation.getLayout();
                return res.json({ EvaluationLayout: evaluationLayout });
            }
            res.status(500).json(errorCodes.RecordNotFound);
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    }

};

module.exports = EvaluationController;