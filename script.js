// Modal elements for Login and Signup
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const loginButton = document.getElementById('navLoginButton'); // Select the login button here
const signupButton = document.getElementById('navSignupButton');
const playlistModal = document.getElementById('playlistModal');
const closeModal = document.getElementById('closeModal');
const confirmAction = document.getElementById('confirmAction');
const playlistNameInput = document.getElementById('playlistName');
const addButton = document.getElementById('addButton');
const deleteButton = document.getElementById('deleteButton');

// Open login modal
loginButton.addEventListener('click', function() {
    loginModal.style.display = 'block';
});

// Open signup modal
signupButton.addEventListener('click', function() {
    signupModal.style.display = 'block';
});

// Close login modal
closeLoginModal.addEventListener('click', function() {
    loginModal.style.display = 'none';
});

// Close signup modal
closeSignupModal.addEventListener('click', function() {
    signupModal.style.display = 'none';
});

// Open the modal for playlists when the "+" button is clicked
document.getElementById('playlistMenuButton').addEventListener('click', function() {
    playlistModal.style.display = 'block';
    document.getElementById('playlistOptions').style.display = 'block'; // Show options
    playlistNameInput.style.display = 'none'; // Hide input field
    confirmAction.style.display = 'none'; // Hide confirm button
});

// Close the modal for playlists
closeModal.addEventListener('click', function() {
    playlistModal.style.display = 'none';
});

// Show input field and confirm button for adding a playlist
addButton.addEventListener('click', function() {
    document.getElementById('playlistOptions').style.display = 'none'; // Hide options
    playlistNameInput.style.display = 'block'; // Show input field
    confirmAction.style.display = 'inline'; // Show confirm button
    confirmAction.dataset.action = 'add'; // Set action to add
    playlistNameInput.value = ''; // Clear input field
});

// Show input field and confirm button for deleting a playlist
deleteButton.addEventListener('click', function() {
    document.getElementById('playlistOptions').style.display = 'none'; // Hide options
    playlistNameInput.style.display = 'block'; // Show input field
    confirmAction.style.display = 'inline'; // Show confirm button
    confirmAction.dataset.action = 'delete'; // Set action to delete
    playlistNameInput.value = ''; // Clear input field
});

// Confirm action to add or delete a playlist
confirmAction.addEventListener('click', function() {
    const playlistName = playlistNameInput.value.trim(); // Trim whitespace
    const playlistsUl = document.querySelector('.playlists'); // Reference to the playlists <ul>

    if (playlistName) {
        if (confirmAction.dataset.action === 'add') {
            // Add the playlist
            let newLi = document.createElement('li');
            let img = document.createElement('img');
            img.src = 'img/cover.jpg'; // Set the cover image
            img.alt = 'Cover Image'; // Add alt text for accessibility
            img.style.width = '40px'; // Set a width for the image
            img.style.height = '40px'; // Set a height for the image

            let p = document.createElement('p');
            p.textContent = playlistName;

            newLi.appendChild(img);
            newLi.appendChild(p);
            playlistsUl.appendChild(newLi); // Append to the playlists <ul>
            alert("Playlist added!");
        } else if (confirmAction.dataset.action === 'delete') {
            // Delete the playlist
            let playlists = document.querySelectorAll('.playlists li');
            let found = false;

            playlists.forEach(function(item) {
                if (item.querySelector('p').textContent.toLowerCase() === playlistName.toLowerCase()) {
                    item.remove();
                    found = true;
                    alert("Playlist deleted!");
                }
            });

            if (!found) {
                alert("Playlist not found!");
            }
        }

        playlistModal.style.display = 'none'; // Close the modal
    } else {
        alert("Please enter a playlist name.");
    }
});

// Handle login from the modal
const modalLoginButton = document.getElementById('modalLoginButton'); // ID of the button in the modal
modalLoginButton.addEventListener('click', function() {
    const email = document.getElementById('email').value; // Get email input from the modal

    // Check if the email exists in localStorage
    if (localStorage.getItem('userEmail') === email) {
        // Close login modal
        loginModal.style.display = 'none';
        alert('Login successful! Redirecting...');

        // Replace signup button with profile image
        signupButton.style.display = 'none'; // Hide signup button

        const loginDiv = document.querySelector('.login'); // Select the login div

        // Replace login button with logout button
        const logoutButton = document.createElement('button');
        logoutButton.id = 'navLogoutButton'; // Set an ID for the logout button
        logoutButton.textContent = 'Logout';
        logoutButton.onclick = function() {
            window.location.reload(); // Reload page to reset the UI
        };

        // Hide the old login button and add the new logout button
        loginButton.style.display = 'none'; // Hide login button
        loginDiv.appendChild(logoutButton); // Append the logout button
    } else {
        alert('Invalid login credentials. Please try again.');
    }
});

// Handle signup
document.getElementById('modalSignupButton').addEventListener('click', function() { // Ensure the correct button ID is referenced
    const email = document.getElementById('signupEmail').value; // Get the email from signup modal

    if (email) { // Check if the email is not empty
        // Store user info in localStorage
        localStorage.setItem('userEmail', email);

        // Close signup modal
        signupModal.style.display = 'none';
        alert('Signup successful! You can now log in.');
    } else {
        alert('Please enter an email address.'); // Alert if email is empty
    }
});

// Close modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    } else if (event.target == signupModal) {
        signupModal.style.display = 'none';
    } else if (event.target == playlistModal) {
        playlistModal.style.display = 'none';
    }
};

const artist= async()=>{
    const response=await(fetch("https://musicbrainz.org/ws/2/artist/?query=artist:eminem&fmt=json"));
    const data=response.json()
    console.log(data);
}

artist()
