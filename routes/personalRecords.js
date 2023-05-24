const express = require('express');
const db = require('../models');
const router = express.Router();
const auth = require('../auth'); //auth/index.js

router.get('/personalRecords', auth, async (req, res) => {
    try {
      const id = req.session.passport.user;
      const user = await db.users.findByPk(id);
  
      const posts = await db.posts.findAll({
        where: { userID: id },
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
  
      let weightliftingPRs = {};
      let cardioPRs = {};
  
      posts.forEach(post => {
        let exerciseName = post.exercise.name;
        let weight = post.weight;
        let reps = post.reps;
        let distance = post.distance;
        let measurement = post.measurement;
        let time = post.minutes * 60 + post.seconds;
      
        if (weight && reps) {
          if (!weightliftingPRs[exerciseName]) weightliftingPRs[exerciseName] = {};
          if (!weightliftingPRs[exerciseName][reps] || weight > weightliftingPRs[exerciseName][reps]) {
            weightliftingPRs[exerciseName][reps] = weight;
          }
        } else if (distance && measurement && time) {
          let distMeasurement = `${distance} ${measurement}`;
          if (!cardioPRs[exerciseName]) cardioPRs[exerciseName] = {};
          if (!cardioPRs[exerciseName][distMeasurement] || time < cardioPRs[exerciseName][distMeasurement]) {
            cardioPRs[exerciseName][distMeasurement] = time;
          }
        }
      });
      
  
      res.render('personalRecords', {
        user,
        posts,
        weightliftingPRs,
        cardioPRs
      });
    } catch (error) {
      console.log(error);
      res.render('personalRecords', {
        user: null
      });
    }
  });
  


module.exports = router;
