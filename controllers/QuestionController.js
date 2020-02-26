const Question = require('../models').Question;
const errorCodes = require('../config/errorCodes');
const sequelize = require('../models').sequelize;

QuestionController = {
    index(req, res) {
        return Question.findAll()
            .then(questions => res.json({ Questions: questions }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const oid = req.params.Oid;
        Question.findOne({ where: { Oid: oid } }).then(question => {
            if (question) {
                res.json({ Question: question })
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    create(req, res) {
        let questionData = req.body.Question;
        sequelize.transaction(transaction => {
            return Question.create(questionData, { transaction }).then(question => {
                res.json({ Question: question });
            });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    update(req, res) {
        const questionData = req.body.Question;
        Question.findOne({ where: { Oid: req.params.Oid } }).then(question => {
            if (question) {
                question.update(questionData).then(questionUpdated => {
                    res.json({ Question: questionUpdated });
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    delete(req, res) {
        const oid = req.params.Oid;
        Question.findOne({ where: { Oid: oid } }).then(question => {
            if (question) {
                question.destroy().then(() => {
                    res.json({ Question: question })
                }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));;
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },
};


module.exports = QuestionController;