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

router.get('/', auth,  async (req, res) => {

    try{

        const user = await db.users.findByPk(req.user.id);
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

        let findUser = (users, comment) => {

            //had to use .find() because forEach doesn't return anything
            return users.find(user => user.id === comment.userID);
          };


        let comments = await db.comments.findAll();
        let commentsArr = [];
        comments.forEach(comment => {

            let obj = {};
            obj["id"] = comment.dataValues.id;
            obj["postID"] = comment.dataValues.postID;
            obj["userID"] = comment.dataValues.userID;
            obj["description"] = comment.dataValues.description;
            obj["createdAt"] = comment.dataValues.createdAt;
            commentsArr.push(obj)

        })
        console.log(commentsArr);
        let posts = await db.posts.findAll({
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
            ],
            order: [['createdAt', 'DESC']]
        });
        console.log('posts', posts[0]);
        res.render('index', {
            user,
            posts,
            comments: commentsArr,
            users: usersArr,
            findUser,
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

module.exports = router;
