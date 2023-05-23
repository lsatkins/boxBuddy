const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/notifications', async (req, res) => {
    try{

        const id = req.session.passport.user;

        let user = await db.users.findByPk(id);

        // Fetch comments made on posts created by the session user, along with associated user and post details
        const comments = await db.comments.findAll({
            include: [
            {
                model: db.users,
                attributes: ['firstName', 'lastName']
            },
            {
                model: db.posts,
                where: { userID: id },
                attributes: []
            }
            ]
        });

        // Fetch comments, likes, and friend requests for the user
        const [likes, friends] = await Promise.all([
            db.likes.findAll({ where: { userID: id } }),
            db.friends.findAll({ where: { userID: id } })
        ])

        const friendRequests = [];
        const friendsData = [];

        for (const friend of friends) {
            const friendUser = await db.users.findByPk(friend.friendID);
            if (friendUser) {
              const { firstName, lastName } = friendUser;
              if (friend.isApproved) {
                friendsData.push({ firstName, lastName });
              } else {
                friendRequests.push({id: friend.id, firstName, lastName });
              }
            }
        }

        res.render('notifications', {
            user,
            comments,
            likes,
            friendRequests,
            friends: friendsData
        })
    }
    catch (error){
        console.log(error);
        res.render('notifications', {
            user: null,
            comments: [],
            likes: [],
            friendRequests: [],
            friends: [],
        });
    }
})

// Accept friend request
router.post('/friendRequests/accept/:id', async (req, res) => {
    try {
      const friendRequestId = req.params.id;
  
      // Find the friend request by ID
      const friendRequest = await db.friends.findByPk(friendRequestId);
  
      // Update the friend request to isApproved = true
      friendRequest.isApproved = true;
      await friendRequest.save();

      res.redirect('/notifications')

    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});
  
// Decline friend request
router.post('/friendRequests/decline/:id', async (req, res) => {
    try {
      const friendRequestId = req.params.id;
  
      // Find the friend request by ID
      const friendRequest = await db.friends.findByPk(friendRequestId);
  
      // Update the friend request to isApproved = false
      friendRequest.isApproved = false;
      await friendRequest.save();
  
      res.redirect('/notifications')
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

module.exports = router;
