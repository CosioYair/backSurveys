var express = require('express');
var router = express.Router();
const QuestionController = require('../controllers').QuestionController;
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], QuestionController.index);
router.get('/:Oid', [passport.authenticate('jwt', { session: false })], QuestionController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], QuestionController.create);
router.put('/:Oid', [passport.authenticate('jwt', { session: false })], QuestionController.update);
router.delete('/:Oid', [passport.authenticate('jwt', { session: false })], QuestionController.delete);

module.exports = router;
