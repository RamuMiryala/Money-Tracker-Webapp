// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost/moneytracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Transaction = require('./models/transactionModel'); // Correct the path accordingly
const User = require('./models/userModel'); // Correct the path accordingly

// Middleware
// ... (rest of the middleware)

// Routes
// ... (rest of the routes)

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
