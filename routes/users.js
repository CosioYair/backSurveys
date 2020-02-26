var express = require('express');
var router = express.Router();
const UserController = require('../controllers').UserController;
const middlewares = require('../middlewares');
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], UserController.index);
router.post('/', [passport.authenticate('jwt', { session: false }), middlewares.validateUserRole], UserController.create);
router.get('/:Oid', [passport.authenticate('jwt', { session: false })], UserController.show);
router.put('/:Oid', [passport.authenticate('jwt', { session: false })], UserController.update);
router.get('/:Oid/getEmployee', [passport.authenticate('jwt', { session: false })], UserController.getEmployee);
router.get('/:Oid/getEvaluations', [passport.authenticate('jwt', { session: false })], UserController.getEvaluations);

module.exports = router;
