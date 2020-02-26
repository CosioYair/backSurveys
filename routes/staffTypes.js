var express = require('express');
var router = express.Router();
const StaffTypeController = require('../controllers').StaffTypeController;
const middlewares = require('../middlewares');

router.get('/', StaffTypeController.index);

module.exports = router;
