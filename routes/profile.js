const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js


router.get('/profile', auth, async (req, res) => {
    try{
        res.render('profile')
    }
    catch (error){
        console.log(error);
        res.render('profile')
    }
})

module.exports = router;
