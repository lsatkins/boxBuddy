const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();

router.get('/login', async (req, res) => {
    try{
        res.render('login')
    }
    catch (error){
        console.log(error);
        res.render('login')
    }
})

module.exports = router;
