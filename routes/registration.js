const express = require('express');
const db = require('../models');
const router = express.Router();
const bcrypt = require('bcryptjs'); //hash & salt pw


router.get('/registration', async (req, res) => {
    try{
        res.render('registration')
    }
    catch (error){
        console.log(error);
        res.render('registration')
    }
})

router.post('/registration', async (req,res) => {
    try{
        // info scraped from header:
        let { firstName, lastName, email, password } = req.body;

        password = bcrypt.hashSync(password, 8) // a salted hash

        // create new record in our database

        let insertRecord = await db.users.create({
            // short for when they're identical:
            firstName,
            lastName,
            email,
            password
        })

        res.redirect('/login')
    }
    catch(err){
        res.render('/registration', {
            error: "can't register this username"
        })
    }
    
})



module.exports = router;
