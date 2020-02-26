var express = require('express');
var router = express.Router();
const StatusEvaluationController = require('../controllers').StatusEvaluationController;
const passport = require('passport');

router.get('/', StatusEvaluationController.index);
router.get('/:id', StatusEvaluationController.show);
router.post('/', [passport.authenticate('jwt', { session: false })], StatusEvaluationController.create);
router.put('/:id', [passport.authenticate('jwt', { session: false })], StatusEvaluationController.update);
router.delete('/:id', [passport.authenticate('jwt', { session: false })], StatusEvaluationController.delete);

module.exports = router;
