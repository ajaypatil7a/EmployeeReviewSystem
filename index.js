const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
// Database file
const db = require('./configs/mongoose'); 

//Getting passport and session
const passport = require('passport');
const localStrategy = require('./configs/passportLocalStrategy');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');




const app = express();
// .json convert json to javascript object
app.use(express.json()); 
// Decodes request 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());


// Setting up session
app.use(session({
    name: 'ERS',
    secret: 'secrete',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: 'session',
        autoRemove: 'native'
    })
}));

// Passport Midleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Getting static files
app.use(express.static('./assets')); 

// Setting up Ejs view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Extracting styles and scripts from the view pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setting up routes
app.use('/', require('./routes/index')); 


app.listen(PORT, (err) => {
    if (err) {
        console.log('Error while starting server: ', err);
    } else {
        console.log(`Server is up and running at port ${PORT}`);
    }
})

// nkYhlE24diLoFL0i
