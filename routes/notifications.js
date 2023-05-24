const express = require('express');
const db = require('../models');
const router = express.Router();
const auth = require('../auth'); //auth/index.js

router.get('/notifications', auth, async (req, res) => {
  try {
    console.log('active notifications');

    const id = req.session.passport.user;
    const user = await db.users.findByPk(id);

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
      ],
      order: [['createdAt', 'DESC']] // Sort comments by createdAt in descending order
    });

    // Fetch likes for the user
    const likes = await db.likes.findAll({
      where: { userID: id },
      order: [['createdAt', 'DESC']] // Sort likes by createdAt in descending order
    });

    // Fetch friend requests for the user
    const friendRequests = await db.friends.findAll({
        where: { userID: id },
        include: [
        {
            model: db.users,
            as: 'fromUser',
            attributes: ['firstName', 'lastName']
        }
        ],
        order: [['createdAt', 'DESC']] // Sort friend requests by createdAt in descending order
    });
  
    // Fetch accepted friend requests for the user
    const acceptedFriendRequests = await db.friends.findAll({
        where: { userID: id, isApproved: true },
        include: [
        {
            model: db.users,
            as: 'fromUser',
            attributes: ['firstName', 'lastName']
        }
        ],
        order: [['createdAt', 'DESC']] // Sort accepted friend requests by createdAt in descending order
    });
  

    // Combine and sort all notifications
    const notifications = [
      ...comments.map(comment => ({ type: 'comment', item: comment })),
      ...likes.map(like => ({ type: 'like', item: like })),
      ...friendRequests.map(request => ({ type: 'friendRequest', item: request })),
      ...acceptedFriendRequests.map(friend => ({ type: 'friend', item: friend }))
    ].sort((a, b) => b.item.createdAt - a.item.createdAt);

    res.render('notifications', {
      user,
      notifications
    });
  } catch (error) {
    console.log(error);
    res.render('notifications', {
      user: null,
      notifications: []
    });
  }
});

  

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
