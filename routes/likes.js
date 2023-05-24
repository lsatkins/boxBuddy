const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

router.get('/likes', async (req, res) => {

    // let id = req.session.passport.user;

    let likes = await db.likes.findAll();

    res.render('index')
    
})
router.post('/likes', async (req, res) => {

    let userID = req.session.passport.user;
    let {postID} = req.body;

    await db.likes.create({userID, postID});
    let like = await db.likes.findOne({where: {userID, postID}})

    console.log(like);

    res.render('index',)
    
})




module.exports = router;