const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('comments/:id', async (req, res) => {

    try {

        let {postID} = req.params;
    let post = await db.posts.findByPk(postID)
    let comments = await db.comments.findAll({where: {postID}});

    res.render('comments', {
        post,
        comments
    })
        
    } catch (error) {
        
    }

})

router.post('comments/:id', async (req, res) => {

    try {

        let {postID} = req.params;
    let userID = req.session.passport.user;
    let {description} = req.body;

    await db.comments.create({postID, userID, description});
    res.redirect('/comments/:id')
        
    } catch (error) {
        
    }
    
})
module.exports = router;