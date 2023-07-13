// getting rerquired module
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

//
const User = require('../models/user');

// Validate the user using local strategy
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    async function (email, password, done) {


        try {
            // Find the user by using email id
            const user = await User.findOne({ email: email });
            // If the password doesn't match return false for authentication is failed
            if (!user || user.password != password) { return done(null, false); }
            // authentiaction is succed return user 
            return done(null, user);

        } catch (error) {
            console.error('Error: ', error);
            return done(null, false);
        }

    }));

// passport serialiser is takes user into session cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializer gets user from its id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) { return done(new Error('Unable to find user'), false); }
        user.password = undefined;
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

// Check authentication is used to check is user log in or not
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    return res.redirect('/signin');
}

// if user is logged in get the user and puts it into local which is used in ejs
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) { res.locals.user = req.user; }
    next();
}


module.exports = passport;