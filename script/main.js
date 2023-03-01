const showcase = document.querySelector("section");
let breweryArray = [];
let favoriteArray = [];
const apiUrlNC =
  "https://api.openbrewerydb.org/breweries?by_state=north_carolina&per_page=30";

const invisible = "invisible";

async function fetchData() {
  const response = await fetch(apiUrlNC);
  const data = await response.json();
  
  data.forEach((item) => {
    breweryArray.push(item);

    //Build the DOM with the current item
    const brewBox = document.createElement("div");
    brewBox.classList.add("brewBox");
    brewBox.innerHTML = `
      <div class = 'iconBox'>
      <i class="star fa-regular fa-star"></i>
      </div>
      <div>
        <div class = 'brewInfo'>
          <h3>${item.name}</h3>
        </div>
        <div class = 'breweryType'>
          <h6>Brew type: </h6>
          <h4>${item.brewery_type}</h4>
        </div>
      </div>
      <div class = 'cityAndWebAddress'>
        <div class = 'cityDiv'>
          <h5>${item.city}, ${item.state}</h5>
        </div>
       
      </div>
    `;
    showcase.append(brewBox);

    const webAddress = document.createElement('div');
    webAddress.classList.add('webAddress');
    const webText = document.createElement('a');

    if (item.website_url) {
      webText.href = item.website_url;
      webText.textContent = "Click to visit website";
    } else {
      webText.textContent = "No website available";
    }
    brewBox.append(webAddress);
    webAddress.append(webText);
  });

  const stars = document.querySelectorAll('.fa-star');

  stars.forEach((star) => {
    star.addEventListener('click', (event) => {
      const target = event.target;
      const div = target.parentElement.parentElement;
      div.classList.add(invisible);
  
      // Add selected brewery to favorite array.
      const breweryName = div.querySelector('.brewInfo').textContent.trim();
      favoriteArray.push(breweryName);
      console.log(favoriteArray);
      const favoriteCountCircle = document.querySelector('.favorite-count-circle');
      if (favoriteArray.length > 0) {
        favoriteCountCircle.classList.remove(invisible);
      }
      favoriteCountCircle.textContent = favoriteArray.length;

    });
  });

  // Create array of brew types with count as value
  const brewTypes = breweryArray.reduce((acc, curr) => {
    const type = curr.brewery_type;
    if (acc[type]) {
      acc[type] = acc[type] + 1;
    } else {
      acc[type] = 1;
    }
    return acc;
  }, {});

  console.log(brewTypes)

 // Create an unordered list element
 const typeList = document.createElement('ul');

 // Add a list item for each brewery type
 for (const type in brewTypes) {
  const typeCount = brewTypes[type];
  const listItem = document.createElement('li');
  listItem.textContent = `${type}: ${typeCount}`;
  typeList.appendChild(listItem);
 }

 // Append the list to the typeArea
 const typeArea = document.querySelector('.typeArea');
 typeArea.appendChild(typeList);
}

fetchData();

// Sort collection in ascending order
function sortCollectionAsc() {
  const brewBoxes = document.querySelectorAll('.brewBox');
  const sortedBrewBoxes = Array.from(brewBoxes).sort((a, b) => {
    const aName = a.querySelector('.brewInfo').textContent.trim();
    const bName = b.querySelector('.brewInfo').textContent.trim();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
  sortedBrewBoxes.forEach((brewBox) => {
    brewBox.parentElement.appendChild(brewBox);
  });
}

// Sort collection in descending order
function sortCollectionDesc() {
  const brewBoxes = document.querySelectorAll('.brewBox');
  const sortedBrewBoxes = Array.from(brewBoxes).sort((a, b) => {
    const aName = a.querySelector('.brewInfo').textContent.trim();
    const bName = b.querySelector('.brewInfo').textContent.trim();
    if (aName > bName) {
      return -1;
    }
    if (aName < bName) {
      return 1;
    }
    return 0;
  });
  sortedBrewBoxes.forEach((brewBox) => {
    brewBox.parentElement.appendChild(brewBox);
  });
}

// Toggle sort functionality for collection
const toggleButton = document.querySelector('.toggleSort');
  toggleButton.addEventListener('click', () => {
    if (toggleButton.classList.contains('sorted-asc')){
      sortCollectionDesc();
      toggleButton.classList.remove('sorted-asc');
      toggleButton.classList.add('sorted-desc');
    } else {
      sortCollectionAsc();
      toggleButton.classList.remove('sorted-desc');
      toggleButton.classList.add('sorted-asc');
    }
  });


// // dry attempt
// const toggleButtonDry = document.querySelector('.toggle');
//   toggleButtonDry.addEventListener('click', (event) => {
//     const target = event.currentTarget;
//     console.log(target + ' : is target')
//     if (target.id === 'collectionSort' && target.classList.contains('sorted-asc')) {
//       sortCollectionDesc();
//       target.classList.remove('sorted-asc');
//       target.classList.add('sorted-desc');
//     } else {
//       sortCollectionAsc();
//       target.classList.remove('sorted-desc');
//       target.classList.add('sorted-asc');
//     }
//   });






