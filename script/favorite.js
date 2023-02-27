const favoriteSelect = document.getElementById('favoriteSelect');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const favoritesListModal = document.querySelector('.favorites-list-modal');

favoriteSelect.addEventListener('click', () => {
  // Clear the list of favorites in the modal
  favoritesListModal.innerHTML = '';

  // Add each favorite item to the list in the modal
  favoriteArray.forEach((favorite, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.classList.add('removeFavorite');
    span.innerHTML = '&times;';
    li.appendChild(span);
    li.innerHTML += favorite;
    favoritesListModal.appendChild(li);

    span.addEventListener('click', () => {
      const index = favoriteArray.indexOf(favorite);
      // Remove the corresponding item from the favoriteArray
      favoriteArray.splice(index, 1);
      // Remove the corresponding list item from the favorites list
      li.remove();
      // Make the original item visible again
      const brewBoxes = document.querySelectorAll('.brewBox');
      brewBoxes.forEach((brewBox) => {
        if (brewBox.querySelector('.brewInfo').textContent.trim() === favorite) {
          brewBox.classList.remove('invisible');
        }
      });
      // Update the favorite count circle
      const favoriteCountCircle = document.querySelector('.favorite-count-circle');
      if (favoriteArray.length === 0) {
        favoriteCountCircle.classList.add('invisible');
      }
      favoriteCountCircle.textContent = favoriteArray.length;
    });
  });

  // Show the modal
  modal.style.display = 'block';

  // Add a click event listener to each 'removeFavorite' span element
  document.querySelectorAll('.removeFavorite').forEach((removeButton) => {
    removeButton.addEventListener('click', (event) => {
      const listItem = event.target.parentElement;
      console.log(listItem.textContent + ': before slice(1)')
      const breweryName = listItem.textContent.slice(1); // remove the 'x ' from the beginning of the text
      console.log(breweryName + ': is breweryName')
      favoriteArray.splice(favoriteArray.indexOf(breweryName), 1); // remove the brewery name from the favorite array
      listItem.remove(); // remove the list item from the favorites list modal

      // Find the corresponding element in the DOM and make it visible again
      const brewBox = Array.from(document.querySelectorAll('.brewBox')).find((box) => {

        const brewInfo = box.querySelector('.brewInfo');
        if (brewInfo) {
          const boxBreweryName = brewInfo.textContent.split(',')[0].trim();
          return boxBreweryName === breweryName;
        }
      });
      console.log(brewBox)

      if (brewBox) {
        brewBox.classList.remove('invisible');
      }

      // Update the favorite count circle
      const favoriteCountCircle = document.querySelector('.favorite-count-circle');
      if (favoriteArray.length === 0) {
        favoriteCountCircle.classList.add('invisible');
      }
      favoriteCountCircle.textContent = favoriteArray.length;
    });
  });
});

// Add a click event listener to the modal's close button to hide the modal
const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Add a click event listener to the window to close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
};
});
