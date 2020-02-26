var express = require('express');
var router = express.Router();
const QuestionTypeController = require('../controllers').QuestionTypeController;
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], QuestionTypeController.index);
router.get('/:id', [passport.authenticate('jwt', { session: false })], QuestionTypeController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], QuestionTypeController.create);
router.put('/:id', [passport.authenticate('jwt', { session: false })], QuestionTypeController.update);
router.delete('/:id', [passport.authenticate('jwt', { session: false })], QuestionTypeController.delete);

module.exports = router;
