const AnswerType = require('../models').AnswerType;
const errorCodes = require('../config/errorCodes');

AnswerTypeController = {
    index(req, res) {
        return AnswerType.findAll()
            .then(answerTypes => res.json({ AnswerTypes: answerTypes }))
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

    answerGroup(req, res) {
        const answerTypeId = req.params.id;
        AnswerType.findOne({ where: { id: answerTypeId } }).then(async answerType => {
            if (answerType) {
                const formatedAnswerGroup = await answerType.getFormatedAnswerGroup();
                res.json({ AnswerGroup: formatedAnswerGroup });
            } else {
                res.status(500).json(errorCodes.RecordNotFound);
            }
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

};

module.exports = AnswerTypeController;