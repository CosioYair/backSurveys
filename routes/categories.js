var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers').CategoryController;
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], CategoryController.index);
router.get('/:Oid', [passport.authenticate('jwt', { session: false })], CategoryController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], CategoryController.create);
router.put('/:Oid', [passport.authenticate('jwt', { session: false })], CategoryController.update);
router.delete('/:Oid', [passport.authenticate('jwt', { session: false })], CategoryController.delete);

module.exports = router;
