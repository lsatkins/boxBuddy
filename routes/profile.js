const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();

router.get('/profile', async (req, res) => {
    try{
        res.render('profile')
    }
    catch (error){
        console.log(error);
        res.render('profile')
    }
})

module.exports = router;
