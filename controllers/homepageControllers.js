const Company = require('../models/company');


// Renders Homepage 
module.exports.renderHomePage = function (req, res) {
    if (req.user) {
        res.redirect('/user/employee');
    }
    res.render('home', { title: 'ERS | home' });
}

// Renders Sign up page
module.exports.renderSignUpPage = async function (req, res) {
    const company = await Company.find({}).select('-employees');
    if (company.length > 0) {
        res.locals.company = company;
    }
    res.render('signup', { title: 'ERS | signup' });
}

// Renders create company
module.exports.renderCreateCompanyPage = function (req, res) {
    res.render('create_company', { title: 'ERS | create company' })
}

// Render sign in form
module.exports.renderSignInPage = function (req, res) {
    if (req.user) {
        res.redirect('/user/employee');
    }
    res.render('signin', { title: 'ERS | signin' });
}