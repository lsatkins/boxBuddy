const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();

router.get('/newpost', async (req, res) => {
    try{
        res.render('newpost')
    }
    catch (error){
        console.log(error);
        res.render('newpost')
    }
})

module.exports = router;
