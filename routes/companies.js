var express = require('express');
var router = express.Router();
const CompanyController = require('../controllers').CompanyController;
const middlewares = require('../middlewares');
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], CompanyController.index);
router.post('/', [passport.authenticate('jwt', { session: false })], CompanyController.create);
router.post('/:Oid/newEmployee', [passport.authenticate('jwt', { session: false })], CompanyController.newEmployee);
router.get('/:Oid', [passport.authenticate('jwt', { session: false })], CompanyController.show);
router.get('/:Oid/employees', [passport.authenticate('jwt', { session: false })], CompanyController.getEmployees);
router.get('/:Oid/evaluations', [passport.authenticate('jwt', { session: false })], CompanyController.getEvaluations);
router.put('/:Oid', [passport.authenticate('jwt', { session: false })], CompanyController.update);
router.get('/:Oid/categories', [passport.authenticate('jwt', { session: false })], CompanyController.getCategories);
router.get('/:Oid/domains', [passport.authenticate('jwt', { session: false })], CompanyController.getDomains);
router.get('/:Oid/dimensions', [passport.authenticate('jwt', { session: false })], CompanyController.getDimensions);
router.get('/:Oid/questions', [passport.authenticate('jwt', { session: false })], CompanyController.getQuestions);
router.get('/:Oid/surveySections', [passport.authenticate('jwt', { session: false })], CompanyController.getSurveySections);

module.exports = router;
