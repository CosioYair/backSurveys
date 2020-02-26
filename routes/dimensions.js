var express = require('express');
var router = express.Router();
const DimensionController = require('../controllers').DimensionController;
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], DimensionController.index);
router.get('/:Oid', [passport.authenticate('jwt', { session: false })], DimensionController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], DimensionController.create);
router.put('/:Oid', [passport.authenticate('jwt', { session: false })], DimensionController.update);
router.delete('/:Oid', [passport.authenticate('jwt', { session: false })], DimensionController.delete);

module.exports = router;
