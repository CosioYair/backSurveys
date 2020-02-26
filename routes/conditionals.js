var express = require('express');
var router = express.Router();
const ConditionalController = require('../controllers').ConditionalController;
const middlewares = require('../middlewares');

router.get('/', ConditionalController.index);

module.exports = router;
