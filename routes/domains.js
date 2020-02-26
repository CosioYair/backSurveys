var express = require('express');
var router = express.Router();
const DomainController = require('../controllers').DomainController;
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false })], DomainController.index);
router.get('/:Oid', [passport.authenticate('jwt', { session: false })], DomainController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], DomainController.create);
router.put('/:Oid', [passport.authenticate('jwt', { session: false })], DomainController.update);
router.delete('/:Oid', [passport.authenticate('jwt', { session: false })], DomainController.delete);

module.exports = router;

