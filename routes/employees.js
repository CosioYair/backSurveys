var express = require('express');
var router = express.Router();
const EmployeeController = require('../controllers').EmployeeController;
const middlewares = require('../middlewares');
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], EmployeeController.index);
router.post('/', [passport.authenticate('jwt', { session: false })], EmployeeController.create);
router.get('/:Oid', [passport.authenticate('jwt', { session: false })], EmployeeController.show);
router.put('/:Oid', [passport.authenticate('jwt', { session: false })], EmployeeController.update);
router.delete('/:Oid', [passport.authenticate('jwt', { session: false })], EmployeeController.delete);
router.get('/:Oid/getEvaluations', [passport.authenticate('jwt', { session: false })], EmployeeController.getEvaluations);
router.get('/:Oid/evaluationAnswers', [passport.authenticate('jwt', { session: false })], EmployeeController.getEvaluationAnswers);
router.put('/:Oid/evaluationAnswers', [passport.authenticate('jwt', { session: false })], EmployeeController.updateEvaluationAnswers);

module.exports = router;
