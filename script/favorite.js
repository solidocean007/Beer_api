const favoriteSelect = document.getElementById('favoriteSelect');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const favoritesListModal = document.querySelector('.favorites-list-modal');

favoriteSelect.addEventListener('click', (event) => {
  // Clear the list of favorites in the modal
  favoritesListModal.innerHTML = '';

  // Add each favorite item to the list in the modal
  favoriteArray.forEach((favorite) => {
    const li = document.createElement('li');
    li.textContent = favorite;
    favoritesListModal.appendChild(li);
  });

  // Show the modal
  modal.style.display = 'block';
});

// Add a click event listener to the modal's close button to hide the modal
const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', (event) => {
  modal.style.display = 'none';
});

// Add a click event listener to the window to close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
