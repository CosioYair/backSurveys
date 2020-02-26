var express = require('express');
var router = express.Router();
const SurveyCatController=require('../controllers').SurveyCatController;
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], SurveyCatController.index);
router.get('/:oid', [passport.authenticate('jwt', { session: false })], SurveyCatController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], SurveyCatController.create);
router.put('/:oid', [passport.authenticate('jwt', { session: false })], SurveyCatController.update);
router.delete('/:oid', [passport.authenticate('jwt', { session: false })], SurveyCatController.delete);
router.put('/:Oid/surveySections', [passport.authenticate('jwt', { session: false })], SurveyCatController.updateSurveySections);
router.get('/:Oid/surveySections', [passport.authenticate('jwt', { session: false })], SurveyCatController.getSurveySections);

module.exports = router;
