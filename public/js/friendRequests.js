// Get all accept buttons
const acceptButtons = document.querySelectorAll('.accept-button');
acceptButtons.forEach(button => {
button.addEventListener('click', async (event) => {
    const requestId = event.target.id;
    await fetch(`/friendRequests/accept/${requestId}`, { method: 'POST' });
    // Perform any additional actions after accepting the friend request
});
});

// Get all decline buttons
const declineButtons = document.querySelectorAll('.decline-button');
declineButtons.forEach(button => {
button.addEventListener('click', async (event) => {
    const requestId = event.target.id;
    await fetch(`/friendRequests/decline/${requestId}`, { method: 'POST' });
    // Perform any additional actions after declining the friend request
});
});