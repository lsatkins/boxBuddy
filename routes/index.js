const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js


router.get('/', auth,  async (req, res) => {
    try{
        res.render('index')
    }
    catch (error){
        console.log(error);
        res.render('index')
    }
})

module.exports = router;
