const Company = require('../models').Company;
const errorCodes = require('../config/errorCodes');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

CompanyController = {
    index(req, res) {
        return Company.findAll()
            .then(compnaies => res.json({ Companies: compnaies }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        Company.findOne({ where: { Oid: oid } }).then(company => {
            if (company) {
                res.json({ Company: company })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let companyData = req.body.Company;
        Company.create(companyData).then(async company => {
            res.json({ Company: company });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const companyData = req.body.Company;
        Company.findOne({ where: { Oid: req.params.Oid } }).then(company => {
            if (company) {
                company.update(companyData).then(companyUpdated => {
                    res.json({ Company: companyUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {

    },

    newEmployee(req, res) {
        const oid = req.params.Oid;
        const user = req.body.User;
        const employee = req.body.Employee;
        const roleId = req.body.RoleId;
        Company.findOne({ where: { Oid: oid } }).then(company => {
            if (company) {
                company.newEmployee(user, employee, roleId)
                    .then(employee => {
                        res.json({ Employee: employee })
                    }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getEmployees(req, res) {
        const oid = req.params.Oid;
        Company.findOne({ where: { Oid: oid } }).then(async company => {
            if (company) {
                const employees = await company.getEmployees();
                res.json({ Employees: employees })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getEvaluations(req, res) {
        const oid = req.params.Oid;
        Company.findOne({ where: { Oid: oid } }).then(async company => {
            if (company) {
                const evaluations = await company.getEvaluations();
                await Promise.all(evaluations.map(async evaluation => {
                    evaluation.dataValues.percentageFinished = await evaluation.getPercentageFinished();
                    return evaluation;
                }));
                res.json({ Evaluations: evaluations })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getCategories(req, res) {
        const oid = req.params.Oid;
        Company.findOne({ where: { Oid: oid } }).then(async company => {
            if (company) {
                const categories = await company.getAvailableCategories();
                res.json({ Categories: categories })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getDomains(req, res) {
        const oid = req.params.Oid;
        Company.findOne({ where: { Oid: oid } }).then(async company => {
            if (company) {
                const domains = await company.getAvailableDomains();
                res.json({ Domains: domains })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getDimensions(req, res) {
        const oid = req.params.Oid;
        Company.findOne({ where: { Oid: oid } }).then(async company => {
            if (company) {
                const dimensions = await company.getAvailableDimensions();
                res.json({ Dimensions: dimensions })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getQuestions(req, res) {
        const oid = req.params.Oid;
        Company.findOne({ where: { Oid: oid } }).then(async company => {
            if (company) {
                const questions = await company.getAvailableQuestions();
                res.json({ Questions: questions })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    getSurveySections(req, res) {
        const oid = req.params.Oid;
        Company.findOne({ where: { Oid: oid } }).then(async company => {
            if (company) {
                const surveySections = await company.getAvailableSurveySections();
                res.json({ SurveySections: surveySections })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};

module.exports = CompanyController;