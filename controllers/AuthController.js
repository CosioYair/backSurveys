const jwt = require('jsonwebtoken');
const User = require('../models').User;
const sequelize = require('../models').sequelize;
const SharedController = require('./SharedController');
var dotenv = require('dotenv').config();

AuthController = {
    async signing(req, res) {
        const user = req.user;
        const authUserInfo = await SharedController.getAuthUserInfo(user);
        const token = AuthController.generateJwt(authUserInfo);
        res.json({ Token: token });
    },

    signup(req, res) {
        let userData = req.body.User;
        let roleId = req.body.RoleId ? req.body.RoleId : 3;
        sequelize.transaction(transaction => {
            return User.create(userData, { transaction }).then(user => {
                return user.addRole(roleId, { transaction }).then(() => user);
            });
        }).then(async user => {
            const authUserInfo = await SharedController.getAuthUserInfo(user);
            const token = AuthController.generateJwt(authUserInfo);
            res.json({ Token: token });
        }).catch(err => res.status(500).json(SharedController.catchGeneralDbError(err)));
    },

    generateJwt(authUserInfo) {
        return jwt.sign(authUserInfo, process.env.SECRET_KEY, { expiresIn: '2h' });
    },
};

module.exports = AuthController;