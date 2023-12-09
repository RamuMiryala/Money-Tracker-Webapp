
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Transaction = require('../models/transactionModel');

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Transactions list route
router.get('/', isLoggedIn, async (req, res) => {
    const transactions = await Transaction.find({ user: req.user._id });
    res.render('transactions/index', { transactions });
});

// Add Transaction route
router.get('/add', isLoggedIn, (req, res) => {
    res.render('transactions/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { description, amount, type } = req.body;
    const newTransaction = new Transaction({
        description,
        amount,
        type,
        user: req.user._id,
    });
    await newTransaction.save();
    res.redirect('/transactions');
});

// Authentication routes
router.get('/login', (req, res) => {
    res.render('login');
});

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/transactions',
        failureRedirect: '/login',
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Export the router
module.exports = router;
