var express = require('express');
var router = express.Router();
const RoleController = require('../controllers').RoleController;
const middlewares = require('../middlewares');

router.get('/', RoleController.userRoles);

module.exports = router;
