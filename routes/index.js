// Getting all require modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Getting controllers
const homepageController = require('../controllers/homepageControllers');
const employeeController = require('../controllers/employeeControllers')

//For other routes getting user 
const userRoutes = require('./user');

// Sign in Sign up and Create Company Routes
router.get('/', homepageController.renderHomePage);
router.get('/signin', homepageController.renderSignInPage);
router.get('/signup', homepageController.renderSignUpPage);
router.get('/create-company', homepageController.renderCreateCompanyPage);

// Form Subission Routes
router.post('/create-company', employeeController.createCompany);
router.post('/create-employee', employeeController.createEmployee);
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/user/employee',
    failureRedirect: '/signup'
}));

// Sign out route
router.get('/signout', passport.checkAuthentication, employeeController.singout);

// After sign in all routes will go to user routes
router.use('/user', userRoutes);

module.exports = router;