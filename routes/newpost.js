const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js


router.get('/newpost', auth, async (req, res) => {
    try{
        let exerciseNames = await db.exercises.findAll({attributes: ['id','name']});
        
        let arrOfObjs = [];
        exerciseNames.forEach(exercise => {

            let obj = {};

            obj["id"] = exercise.dataValues.id;
            obj["name"] = exercise.dataValues.name;
            arrOfObjs.push(obj);
    })

        console.log(arrOfObjs);        
        res.render('newpost', {
            exercises: arrOfObjs
        })
    }
    catch (error){
        console.log(error);
        res.render('newpost')
    }
})

router.post('/newpost', auth, async (req, res) => {
    try{
        let userID = req.session.passport.user;
        let {exerciseID, sets, reps, weight, minutes, seconds, distance, measurement, calories, notes} = req.body;

        sets = parseInt(sets);
        reps = parseInt(reps);
        weight = parseInt(weight);

        console.log(userID, 'userID');
        console.log(req.body);

        await db.posts.create({userID, exerciseID, sets, reps, weight, minutes, seconds, distance, measurement, calories, notes});

        res.redirect('/');
    }
    catch (error){
        console.log(error);
        res.redirect('/newpost')
    }
})

module.exports = router;
