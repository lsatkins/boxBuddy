const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js
const cloudinary = require('cloudinary').v2;
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
}
function formatDate2(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
}

router.get('/profile', auth, async (req, res) => {
    try {
        let user = await db.users.findByPk(req.session.passport.user);

        let friends = await db.friends.findAll({
            where: {userID: req.session.passport.user}
        })

        const friendCount = (friends) => {
            let friendCounter = 0;
            friends.forEach(friend => {
                friendCounter += 1;
            })
            return friendCounter;
        }

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

        let posts = await db.posts.findAll({
            where: {userID: req.session.passport.user},
            include: [
                {
                    model: db.users,
                    required: true,
                    attributes: ['firstName', 'lastName', 'bio', 'imageURL']
                },
                {
                    model: db.exercises,
                    required: true,
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'DESC']]
        })

        res.render('profile', {
            user,
            friends,
            posts,
            comments: commentsArr,
            users: usersArr,
            formatDate,
            formatDate2,
            friendCount,
            findUser
        })
    } catch (error) {
        console.log(error);
        res.render('profile')
    }
});

router.post('/profile/edit', async (req, res) => {
    const id = req.session.passport.user;
    const { bio } = req.body; 

    try {
        await db.users.update({ bio: bio }, { where: { id } }); 
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.post('/profile/picture', upload.single('imageURL'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const id = req.session.passport.user;
        await db.users.update({ imageURL: result.secure_url }, { where: { id } });
        res.send(result.secure_url);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
