var express = require('express');
var router = express.Router();
const AuthController = require('../controllers').AuthController;
const middlewares = require('../middlewares');

router.post('/', [middlewares.passportLocalStrategy], AuthController.signing);
router.post('/signup', [middlewares.validateCompanyRole], AuthController.signup);

module.exports = router;
