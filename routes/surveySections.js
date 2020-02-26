var express = require('express');
var router = express.Router();
const SurveySectionController = require('../controllers').SurveySectionController;
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], SurveySectionController.index);
router.get('/:Oid', [passport.authenticate('jwt', { session: false })], SurveySectionController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], SurveySectionController.create);
router.put('/:Oid', [passport.authenticate('jwt', { session: false })], SurveySectionController.update);
router.delete('/:Oid', [passport.authenticate('jwt', { session: false })], SurveySectionController.delete);
router.put('/:Oid/questions', [passport.authenticate('jwt', { session: false })], SurveySectionController.updateQuestions);
router.get('/:Oid/questions', [passport.authenticate('jwt', { session: false })], SurveySectionController.getQuestions);

module.exports = router;
