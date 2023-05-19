const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();

router.get('/registration', async (req, res) => {
    try{
        res.render('registration')
    }
    catch (error){
        console.log(error);
        res.render('registration')
    }
})

module.exports = router;
