const mongoose = require('mongoose');
require('dotenv').config();

// Getting Mongo URL from dotenv file setting connection
mongoose.connect(process.env.MONGO_URL); 

// Friring up connection of db
const db = mongoose.connection;

// Getting if error occured in file connection
db.on('error', console.error.bind(console, 'Error: connecting to db :: MongoDB')); 


// Once the connection is seted
db.once('open', (err) => {
    if (err) {
        console.log('Error: while opening db connection', err);
    } else {
        console.log('DB connection successfull :: MongoDB');
    }
})


module.exports = db;