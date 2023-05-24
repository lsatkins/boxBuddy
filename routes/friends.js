const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js


router.get('/friends', auth,  async (req, res) => {
    try{

        let userID = req.session.passport.user;
        let users = await db.users.findAll();
        let friends = await db.friends.findAll({where: {userID: userID, isApproved: true}});
        let arrOfIDs = [];
        friends.forEach(friend => {

            arrOfIDs.push(friend.dataValues.friendID);
            
    })

    let arrOfFriends = [];

for (const id of arrOfIDs) {
  let results = await db.users.findByPk(id);

  let obj = {};
  obj["id"] = results.dataValues.id;
  obj["firstName"] = results.dataValues.firstName;
  obj["lastName"] = results.dataValues.lastName;
  obj["email"] = results.dataValues.email;
  obj["imageURL"] = results.dataValues.imageURL;
  arrOfFriends.push(obj);

}
   
        let arrOfUsers = [];
        users.forEach(user => {

            let obj = {};

            obj["id"] = user.dataValues.id;
            obj["firstName"] = user.dataValues.firstName;
            obj["lastName"] = user.dataValues.lastName;
            obj["imageURL"] = user.dataValues.imageURL;
            arrOfUsers.push(obj);
    })
        res.render('friends', {
            users: arrOfUsers,
            friends: arrOfFriends
        })
    }
    catch (error){
        console.log(error);
        res.redirect('/')
    }
})

router.post('/friends', async (req, res) => {

    try {

        let userID = req.session.passport.user;
    console.log(userID, 'user');
    let {friendID} = req.body;
    friendID = parseInt(friendID);
    console.log(friendID, 'friend');
    let isApproved = false;
    await db.friends.create({userID, friendID, isApproved})
    let temp = userID;
    userID = friendID;
    friendID = temp;
    await db.friends.create({userID, friendID, isApproved})
    res.redirect('/friends');
        
    } catch (error) {
        
    }
    
})

module.exports = router;