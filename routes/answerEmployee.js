var express = require('express');
var router = express.Router();
const AnswerEmployeeController = require('../controllers').AnswerEmployeeController;
const passport = require('passport');

// router.get('/', [passport.authenticate('jwt', { session: false })], Bpa_UsuarioController.index);
router.get('/', [passport.authenticate('jwt', { session: false })], AnswerEmployeeController.index);
router.get('/:oid', [passport.authenticate('jwt', { session: false })], AnswerEmployeeController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], AnswerEmployeeController.create);
router.put('/:oid', [passport.authenticate('jwt', { session: false })], AnswerEmployeeController.update);
router.delete('/:oid', [passport.authenticate('jwt', { session: false })], AnswerEmployeeController.delete);

module.exports = router;
