var express = require('express');
var router = express.Router();
const StudyLevelController = require('../controllers').StudyLevelController;
const middlewares = require('../middlewares');

router.get('/', StudyLevelController.index);

module.exports = router;
