var express = require('express');
var router = express.Router();
const QuestionGroupController = require('../controllers').QuestionGroupController;
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], QuestionGroupController.index);
router.get('/:oid', [passport.authenticate('jwt', { session: false })], QuestionGroupController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], QuestionGroupController.create);
router.put('/:oid', [passport.authenticate('jwt', { session: false })], QuestionGroupController.update);
router.delete('/:oid', [passport.authenticate('jwt', { session: false })], QuestionGroupController.delete);

module.exports = router;
