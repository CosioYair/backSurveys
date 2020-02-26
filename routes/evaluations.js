var express = require('express');
var router = express.Router();
const EvaluationController = require('../controllers').EvaluationController;
const middlewares = require('../middlewares');
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EvaluationController.index);
router.post('/', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EvaluationController.create);
router.get('/:Oid', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EvaluationController.show);
router.put('/:Oid', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EvaluationController.update);
router.delete('/:Oid', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EvaluationController.delete);
router.post('/:Oid/setRandomEmployees', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EvaluationController.setRandomEmployees);
router.get('/:Oid/getLayout', [passport.authenticate('jwt', { session: false })], EvaluationController.getLayout);

module.exports = router;
