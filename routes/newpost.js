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

router.post('/newpost', auth, async (req,res) => {
    try{
        // info scraped from header:
        let { exercise, sets, reps, weight, minutes, seconds, distance, measurement, calories, notes } = req.body;

        // find or create the exercise
        let [exerciseRecord, created] = await db.exercises.findOrCreate({
            where: { name: exercise },
            defaults: {
                // if not exist, these properties will be used for creating new record
                type: 'Default Type',
                muscle: 'Default Muscle',
                equipment: 'Default Equipment',
                instructions: 'Default Instructions'
            }
        });

        // create new record in our database
        let newPost = await db.posts.create({
            exerciseID: exerciseRecord.id,
            sets,
            reps,
            weight,
            userID: req.session.passport.user,
            minutes,
            seconds,
            distance,
            measurement,
            calories,
            notes
        })

        res.redirect('/')
    }
    catch(err){
        console.log(err);
        res.render('newpost', {
            error: "failure creating a post"
        })
    }
})

module.exports = router;
