var express = require('express');
var router = express.Router();
const AnswerTypeController = require('../controllers').AnswerTypeController;
const middlewares = require('../middlewares');

router.get('/', AnswerTypeController.index);
router.get('/:id/answerGroup', AnswerTypeController.answerGroup);

module.exports = router;
