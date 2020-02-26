var express = require('express');
var router = express.Router();
const SurveyQuestController = require('../controllers').SurveyQuestController;
const passport = require('passport');

router.get('/', SurveyQuestController.index);
router.get('/:oid',  SurveyQuestController.show);
router.post('/',  SurveyQuestController.create);
router.put('/:oid', SurveyQuestController.update);
router.delete('/:oid', SurveyQuestController.delete);

module.exports = router;
