const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js


router.get('/newpost', auth, async (req, res) => {
    try{
        res.render('newpost')
    }
    catch (error){
        console.log(error);
        res.render('newpost')
    }
})

module.exports = router;
