const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js
const cloudinary = require('cloudinary').v2;

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
            ]
        })

        res.render('profile', {
            user,
            posts,
            formatDate,
            formatDate2
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

module.exports = router;
