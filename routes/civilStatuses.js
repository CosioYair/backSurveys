var express = require('express');
var router = express.Router();
const CivilStatusController = require('../controllers').CivilStatusController;
const middlewares = require('../middlewares');

router.get('/', CivilStatusController.index);

module.exports = router;
