// Get all accept buttons
const acceptButtons = document.querySelectorAll('.accept-button');
acceptButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const requestId = event.target.id;
    await fetch(`/friendRequests/accept/${requestId}`, { method: 'POST' });
    // Perform any additional actions after accepting the friend request

    //todo: re paint vs rely on refresh

    // Refresh the page after successful request
    location.reload();
  });
});

// Get all decline buttons
const declineButtons = document.querySelectorAll('.decline-button');
declineButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const requestId = event.target.id;
    await fetch(`/friendRequests/decline/${requestId}`, { method: 'POST' });
    // Perform any additional actions after declining the friend request

    // Refresh the page after successful request
    location.reload();
  });
});


//? Refresh Error:
// friendRequests.js:6     GET https://localhost:3000/notifications net::ERR_SSL_PROTOCOL_ERROR
// (anonymous) @ friendRequests.js:6
// friendRequests.js:6     Uncaught (in promise) TypeError: Failed to fetch
//     at HTMLButtonElement.<anonymous> (friendRequests.js:6:11)