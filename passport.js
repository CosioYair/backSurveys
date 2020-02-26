const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models').User;
const errorCodes = require('./config/errorCodes');
var dotenv = require('dotenv').config();

//JWT Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}, async (req, done) => {
    try {
        const user = await User.findOne({ where: { Oid: req.Oid } });
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

//Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        user = await User.scope('withPassword').findOne({ where: { email } });
        if (user) {
            if (user.validatePassword(password)) {
                return done(null, user);
            }
        }
        done(null, false, [errorCodes.EmailPassword]);
    } catch (error) {
        done(error, false);
    }
}));
