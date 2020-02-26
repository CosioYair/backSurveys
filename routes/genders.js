var express = require('express');
var router = express.Router();
const GenderController = require('../controllers').GenderController;
const middlewares = require('../middlewares');

router.get('/', GenderController.index);

module.exports = router;
