let editButton = document.querySelector('.edit-button');

editButton.addEventListener('click', (event) => {
    // console.log(event);
    const userBio = document.querySelector('.userBio');
    const saveButton = document.querySelector('.save-button');
    const cancelButton = document.querySelector('.cancel-button');

    // Switch to edit mode
    userBio.setAttribute('contentEditable', true);

    // Show save and cancel buttons
    saveButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    editButton.style.display = 'none';

    saveButton.addEventListener('click', async (event) => {
        const userBio = document.querySelector('.userBio');
        const saveButton = document.querySelector('.save-button');
        const cancelButton = document.querySelector('.cancel-button');
    
        userBio.setAttribute('contentEditable', false);
    
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
        editButton.style.display = 'inline';
    
        // Make a fetch request to update the user's bio
        const response = await fetch(`/profile/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bio: userBio.textContent 
            }),
        });
    
        if (!response.ok) {
            console.error('Failed to save profile');
        }
    });

    cancelButton.addEventListener('click', (event) => {
        const userBio = document.querySelector('.userBio');
        const saveButton = document.querySelector('.save-button');
        const cancelButton = document.querySelector('.cancel-button');

        userBio.setAttribute('contentEditable', false)

        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
        editButton.style.display = 'inline';
    })

});

