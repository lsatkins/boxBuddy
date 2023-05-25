const acceptButtons = document.querySelectorAll('.accept-button');
acceptButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const requestId = event.target.id;
    await fetch(`/friendRequests/accept/${requestId}`, { method: 'POST' });

    // Get the parent div of the accept button
    const friendRequestDiv = event.target.closest('.flex-row');

    // Create the accepted message HTML
    const acceptedMessageHTML = `
      <div class="flex flex-row pb-1 pl-1 border-b-2 border-black mt-4 text-lg items-center justify-start">
        You have accepted <%= notification.item.fromUser.firstName %> <%= notification.item.fromUser.lastName %> as your friend.
      </div>
    `;

    // Replace the friend request div with the accepted message HTML
    friendRequestDiv.innerHTML = acceptedMessageHTML;
  });
});

// Similarly, update the event listener for the decline button
const declineButtons = document.querySelectorAll('.decline-button');
declineButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const requestId = event.target.id;
    await fetch(`/friendRequests/decline/${requestId}`, { method: 'POST' });

    // Get the parent div of the decline button
    const friendRequestDiv = event.target.closest('.flex-row');

    // Create the declined message HTML
    const declinedMessageHTML = `
      <div class="flex flex-row pb-1 pl-1 border-b-2 border-black mt-4 text-lg items-center justify-start">
        You have declined <%= notification.item.fromUser.firstName %> <%= notification.item.fromUser.lastName %>'s friend request.
      </div>
    `;

    // Replace the friend request div with the declined message HTML
    friendRequestDiv.innerHTML = declinedMessageHTML;
  });
});
