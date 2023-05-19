const express = require('express');
const db = require('../models');
const router = express.Router();
const bcrypt = require('bcryptjs'); //hash & salt pw
const passport = require('passport')

router.get('/login', async (req, res) => {
    try{
        res.render('login')
    }
    catch (error){
        console.log(error);
        res.render('login')
    }
})

router.post('/login', passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: '/login'
}))

router.get('/logout', (req, res) => {
    
    req.logout() // from passport, kill the session

    res.redirect('/login')
})

module.exports = router;
