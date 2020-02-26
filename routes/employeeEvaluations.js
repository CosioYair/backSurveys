var express = require('express');
var router = express.Router();
const EmployeeEvaluationController = require('../controllers').EmployeeEvaluationController;
const middlewares = require('../middlewares');
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EmployeeEvaluationController.index);
router.get('/:Oid', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EmployeeEvaluationController.show);
router.post('/', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EmployeeEvaluationController.create);
router.put('/:Oid', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EmployeeEvaluationController.update);
router.delete('/:Oid', [passport.authenticate('jwt', { session: false }), middlewares.validateCompanyRole], EmployeeEvaluationController.delete);

module.exports = router;
