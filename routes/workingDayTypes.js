var express = require('express');
var router = express.Router();
const WorkingDayTypeController = require('../controllers').WorkingDayTypeController;
const middlewares = require('../middlewares');

router.get('/', WorkingDayTypeController.index);

module.exports = router;
