const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

router.get('/likes', async (req, res) => {

    let id = req.session.passport.user;

    let likes = await db.likes.findAll({where: {userID : id}});
    console.log(likes);

    res.json(likes);
    
})
router.post('/likes', async (req, res) => {
    try {
        let userID = req.session.passport.user;
        let { postID } = req.body;

        await db.likes.create({ userID, postID });
        let thisLike = await db.likes.findOne({where: {userID, postID}})

        console.log(thisLike);
        let thisLikeID = thisLike.dataValues.id;
        console.log('id', thisLikeID);

        res.json({ thisLikeID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
router.delete('/likes', async (req, res) => {
    try {
        
        let { id } = req.body;

        let deleted = await db.likes.destroy({where: {id}});
        

        res.json({ deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});








module.exports = router;