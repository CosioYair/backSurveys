var express = require('express');
var router = express.Router();
const SurveyTypeController = require('../controllers').SurveyTypeController;

router.get('/', SurveyTypeController.index);

module.exports = router;
