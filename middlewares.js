var dotenv = require('dotenv').config();
const passport = require('passport');
const errorCodes = require('./config/errorCodes');

const Middlewares = {

    async validateUserRole(req, res, next) {
        const user = req.user;
        const userRoles = await user.getRoles();
        const newUserRoleId = req.body.RoleId;
        if (newUserRoleId) {
            const superAdminRole = userRoles.find(role => role.id === 1);
            const companyRole = userRoles.find(role => role.id === 3);
            if (superAdminRole || (companyRole && newUserRoleId === 4)) {
                return next();
            }
        }
        res.status(500).json([errorCodes.Role]);
    },

    async validateCompanyRole(req, res, next) {
        const user = req.user;
        if (user) {
            const roles = await user.getRoles();
            const companyRole = roles.find(role => role.Id == 3);
            if (companyRole) {
                res.status(500).json([errorCodes.Role]);
                return;
            }
        } else {
            const roleId = req.body.RoleId;
            if (roleId != 3) {
                res.status(500).json([errorCodes.Role]);
                return;
            }
        }
        next();
    },

    async validateLoginRole(req, res, next) {
        const bpaUsuario = req.user;
        const roleId = req.body.RoleId ? req.body.RoleId : 1;
        bpaUsuario.validateRole(roleId).then(validRole => {
            if (!validRole) {
                res.status(500).json([errorCodes.Role]);
                return;
            }
            next();
        });
    },

    passportLocalStrategy(req, res, next) {
        Middlewares.passportCustomCallback(req, res, next, 'local');
    },

    passportCustomCallback(req, res, next, strategy) {
        passport.authenticate(strategy, { session: false }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(500).json(info);
            }
            req.user = user;
            next();
        })(req, res, next);
    },

};

module.exports = Middlewares;
