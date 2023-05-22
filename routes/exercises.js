const express = require('express');
const db = require('../models');
const router = express.Router();

// PRm4DCcsX6csrmpSuqq7kQ==7mA4R3zoQLiXGAiw

router.get('/exercises', async (req, res) => {

    let exercises = await db.exercises.findAll();

    res.render('exercises', {
        exercises
    });

})

module.exports = router;