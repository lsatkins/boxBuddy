let editButton = document.querySelector('.edit-button');
let logoutButton = document.querySelector('.logout-button');
let profilePic = document.querySelector('#profilePic');
let fileInput = document.querySelector('#fileInput');

editButton.addEventListener('click', (event) => {
    // console.log(event);
    const userBio = document.querySelector('.userBio');
    const saveButton = document.querySelector('.save-button');
    const cancelButton = document.querySelector('.cancel-button');

    // Switch to edit mode
    userBio.setAttribute('contentEditable', true);
    userBio.classList.add('border', 'rounded', 'p-2');

    // Show save and cancel buttons
    saveButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    editButton.style.display = 'none';
    logoutButton.style.display = 'none';
    fileInput.style.display = 'inline';

    fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('imageURL', file);
    
        try {
            const response = await fetch('/profile/picture', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                // Update the profile picture on the page
                const imageURL = await response.text();
                profilePic.src = imageURL;
            } else {
                console.error('Failed to upload profile picture');
            }
        } catch (error) {
            console.error(error);
        }
    });

    saveButton.addEventListener('click', async (event) => {
        const userBio = document.querySelector('.userBio');
        const saveButton = document.querySelector('.save-button');
        const cancelButton = document.querySelector('.cancel-button');
    
        userBio.setAttribute('contentEditable', false);

        userBio.classList.remove('border', 'rounded', 'p-2');
    
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
        editButton.style.display = 'inline';
        logoutButton.style.display = 'inline';
        fileInput.style.display = 'none';
    
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

        userBio.classList.remove('border', 'rounded', 'p-2');

        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
        editButton.style.display = 'inline';
        logoutButton.style.display = 'inline';
        fileInput.style.display = 'none';
    })

});

logoutButton.addEventListener('click', () => {
    fetch('/logout', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            window.location.href = data.redirectUrl; // Redirect to the login page
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
});
