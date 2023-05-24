const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
}

router.get('/comments', auth, async (req, res) => {
    res.render('comments')
})

router.get('/comments/:id', auth, async (req, res) => {

    try{
        let postID = req.params.id;
        const user = await db.users.findByPk(req.user.id);
        console.log('18', user);
        let users = await db.users.findAll();
        let usersArr = [];
        users.forEach(user => {

            let obj = {};
            obj["id"] = user.dataValues.id;
            obj["firstName"] = user.dataValues.firstName;
            obj["lastName"] = user.dataValues.lastName;
            obj["createdAt"] = user.dataValues.createdAt;
            usersArr.push(obj)

        })

        let posts = await db.posts.findOne({
            where: { id: postID },
            include: [
              {
                model: db.users,
                required: true,
                attributes: ['firstName', 'lastName', 'imageURL']
              },
              {
                model: db.exercises,
                required: true,
                attributes: ['name']
              }
            ]
          });
        let allComments = await db.comments.findAll({
            include: [
              {
                model: db.users,
                required: true,
                attributes: ['firstName', 'lastName', 'imageURL']
              },
              {
                model: db.posts,
                where: { id: postID },
                attributes: []
            }
            ]
          });
        res.render('comments', {
            postID,
            user,
            allComments,
            users: usersArr,
            posts,
            formatDate
        })
    }
    catch (error){
        console.log(error);
        res.render('index', {
            error: 'An error occurred during the request.'
        })
    }
})


router.post('/comments/:id', auth, async (req, res) => {
    
    let postID = req.params.id

    try{
        
        let userID = req.session.passport.user;
        let {description} = req.body;
        console.log('here');

        await db.comments.create({postID, userID, description});

        console.log('here1');

        res.redirect(`/comments/${postID}`)
        
    }
    catch (error){
        console.log(error);
        res.redirect('/comments/:id')

    }
})
module.exports = router;