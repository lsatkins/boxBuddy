const acceptButtons = document.querySelectorAll('.accept-button');
acceptButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const requestId = event.target.id;
    await fetch(`/friendRequests/accept/${requestId}`, { method: 'POST' });

    // Get the parent div of the accept button
    const friendRequestDiv = event.target.closest('.flex-row');

    // Grab the name from the existing friendRequest div:
    const friendRequestInnerText = document.querySelector('.friendRequest').innerText

    let friendRequest = friendRequestInnerText.substring(16);

    let spaceCount = 0;
    let friendName = ""

    for(let i = 0; i < friendRequest.length; i++){

      if(spaceCount == 1 && friendRequest[i] == "A"){
        friendName = friendRequest.substring(0, i-1)
      }
      if (friendRequest[i] == " "){
        spaceCount++
      }

    }
    console.log(friendName);

    // Create the accepted message HTML
    const acceptedMessageHTML = `You have accepted ${friendName} as your friend.`;

    // Replace the friend request div with the accepted message HTML
    friendRequestDiv.innerHTML = acceptedMessageHTML;
  });
});

// Similarly, update the event listener for the decline button
const declineButtons = document.querySelectorAll('.decline-button');
declineButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const requestId = event.target.id;
    console.log(requestId);

    let data = {
      requestId: requestId
    }
    console.log(data);
    let results = await fetch(`/friendRequests/decline/${requestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)})

    console.log(results);

    // let response = await results.json();

    // console.log(response);

    // Get the parent div of the decline button
    const friendRequestDiv = event.target.closest('.flex-row');

    // Grab the name from the existing friendRequest div:
    const friendRequestInnerText = document.querySelector('.friendRequest').innerText

    let friendRequest = friendRequestInnerText.substring(16);

    let spaceCount = 0;
    let friendName = ""

    for(let i = 0; i < friendRequest.length; i++){

      if(spaceCount == 1 && friendRequest[i] == "A"){
        friendName = friendRequest.substring(0, i-1)
      }
      if (friendRequest[i] == " "){
        spaceCount++
      }

    }
    console.log(friendName);

    // Create the declined message HTML
    const declinedMessageHTML = `You have declined ${friendName} as your friend.`;

    // Replace the friend request div with the declined message HTML
    friendRequestDiv.innerHTML = declinedMessageHTML;
  });
});
