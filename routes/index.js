const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js


router.get('/', auth,  async (req, res) => {

    try{

        let posts = await db.posts.findAll({
            include: [
                {
                    model: db.users,
                    required: true,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: db.exercises,
                    required: true,
                    attributes: ['name']
                }
            ]
        });

        res.render('index', {
            posts
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
