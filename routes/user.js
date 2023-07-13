// Getting all require modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
// Getting controllers
const employeeController = require('../controllers/employeeControllers');

// Feedback Routes
router.post('/ask-feedback', passport.checkAuthentication, employeeController.askFeedback);
router.post('/cancel-feedback', passport.checkAuthentication, employeeController.cancelFeedback);
router.post('/submit-feedback', passport.checkAuthentication, employeeController.submitFeedback);

// Different types of view rendering routes
router.get('/admin', passport.checkAuthentication, employeeController.adminPanel); // render admin view
router.get('/employee-review/:id', passport.checkAuthentication, employeeController.employeeReview); // render employee review (admin-panel -> employee review)
router.get('/employee', passport.checkAuthentication, employeeController.employeeView); // render employee view

// Employee Coverting Routes
// Convert Employee ->  Admin
router.post('/make-admin', passport.checkAuthentication, employeeController.makeAdmin);
// Convert Admin -> Employee 
router.post('/make-employee', passport.checkAuthentication, employeeController.makeEmployee); 


// Deleting the user route
router.delete('/employee', passport.checkAuthentication, employeeController.deleteEmployee);

module.exports = router;