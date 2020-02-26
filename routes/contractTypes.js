var express = require('express');
var router = express.Router();
const ContractTypeController = require('../controllers').ContractTypeController;
const middlewares = require('../middlewares');

router.get('/', ContractTypeController.index);

module.exports = router;
