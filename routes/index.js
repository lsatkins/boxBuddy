const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        res.render('index')
    }
    catch (error){
        console.log(error);
        res.render('index')
    }
})

module.exports = router;
