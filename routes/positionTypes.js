var express = require('express');
var router = express.Router();
const PositionTypeController = require('../controllers').PositionTypeController;
const middlewares = require('../middlewares');

router.get('/', PositionTypeController.index);

module.exports = router;
