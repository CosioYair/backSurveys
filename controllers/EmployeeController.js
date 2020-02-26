const Employee = require('../models').Employee;
const errorCodes = require('../config/errorCodes');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

EmployeeController = {
    index(req, res) {
        return Employee.findAll()
            .then(employees => res.json({ Employees: employees }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        Employee.findOne({ where: { Oid: oid } }).then(employee => {
            if (employee) {
                res.json({ Employee: employee })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let employeeData = req.body.Employee;
        Employee.create(employeeData).then(async employee => {
            res.json({ Employee: employee });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const employeeData = req.body.Employee;
        Employee.findOne({ where: { Oid: req.params.Oid } }).then(employee => {
            if (employee) {
                employee.update(employeeData).then(employeeUpdated => {
                    res.json({ Employee: employeeUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const oid = req.params.Oid;
        Employee.findOne({ where: { Oid: oid } }).then(employee => {
            if (employee) {
                employee.destroy();
                res.json({ Employee: employee })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getEvaluations(req, res) {
        const oid = req.params.Oid;
        Employee.findOne({ where: { Oid: oid } }).then(async employee => {
            if (employee) {
                const evaluations = await employee.getEvaluations({
                    through: {
                        statusEvaluationId: {
                            [Op.not]: 3
                        }
                    }
                });
                await Promise.all(evaluations.map(async evaluation => {
                    const employeeEvaluation = evaluation.EmployeeEvaluation;
                    employeeEvaluation.dataValues.percentageFinished = await employeeEvaluation.getPercentageFinished();
                    return evaluation;
                }));
                res.json({ Evaluations: evaluations });
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getEvaluationAnswers(req, res) {
        const oid = req.params.Oid;
        const evaluationOid = req.body.EvaluationOid;
        Employee.findOne({ where: { Oid: oid } }).then(async employee => {
            if (employee) {
                const evaluationAnswers = await employee.getEvaluationAnswers(evaluationOid);
                return res.json({ EvaluationAnswers: evaluationAnswers });
            }
            res.status(500).json(errorCodes.RecordNotFound);
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    updateEvaluationAnswers(req, res) {
        const oid = req.params.Oid;
        const evaluationOid = req.body.EvaluationOid;
        const evaluationAnswers = req.body.EvaluationAnswers;
        Employee.findOne({ where: { Oid: oid } }).then(async employee => {
            if (employee) {
                const newEvaluationAnswers = await employee.updateEvaluationAnswers(evaluationOid, evaluationAnswers);
                return res.json({ EvaluationAnswers: newEvaluationAnswers });
            }
            res.status(500).json(errorCodes.RecordNotFound);
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    }
};

module.exports = EmployeeController;