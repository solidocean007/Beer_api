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
        <img data-select="" class="beerTab" title="Favorites" 
        src="/images/beer_tab.png">
      </div>
      <div class = 'brewInfo'>
        <h3>${item.name}</h3>
      </div>
      <div class = 'breweryType'>
        <h4>${item.brewery_type}</h4>
      </div>
    `;
    showcase.append(brewBox);

    const cityDiv = document.createElement("div");
    cityDiv.classList.add("cityDiv");
    const cityText = document.createElement("h5");
    cityText.textContent = `${item.city}, ${item.state}`;
    brewBox.append(cityDiv);
    cityDiv.append(cityText);

    const webAddress = document.createElement("div");
    webAddress.classList.add("webAddress");
    const webText = document.createElement("a");

    if (item.website_url) {
      webText.href = item.website_url;
      webText.textContent = "Click to visit website";
    } else {
      webText.textContent = "No website available";
    }
    brewBox.append(webAddress);
    webAddress.append(webText);
  });

  const beerTabs = document.querySelectorAll('.beerTab');
  console.log(beerTabs);
  console.log(breweryArray);

  beerTabs.forEach((beerTab) => {
    beerTab.addEventListener('click', (event) => {
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

// Sort favorites list in ascending order
function sortFavoritesAsc() {
  const favoriteList = document.querySelector('.favorites-list-modal');
  const favoriteItems = Array.from(favoriteList.querySelectorAll('li'));
  const sortedFavorites = favoriteItems.sort((a, b) => {
    const aName = a.textContent.trim().slice(1);
    const bName = b.textContent.trim().slice(1);
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
  sortedFavorites.forEach((favorite) => {
    favoriteList.appendChild(favorite);
  });
}

// Sort favorites list in descending order
function sortFavoritesDesc() {
  const favoriteList = document.querySelector('.favorites-list-modal');
  const favoriteItems = Array.from(favoriteList.querySelectorAll('li'));
  const sortedFavorites = favoriteItems.sort((a, b) => {
    const aName = a.textContent.trim().slice(1);
    const bName = b.textContent.trim().slice(1);
    if (aName > bName) {
      return -1;
    }
    if (aName < bName) {
      return 1;
    }
    return 0;
  });
  sortedFavorites.forEach((favorite) => {
    favoriteList.appendChild(favorite);
  });
}

// const totalMicrobreweries = document.querySelectorAll('.brewBox').length;
// const totalMicrobreweriesElement = document.querySelector('#totalMicrobreweries');
// totalMicrobreweriesElement.textContent = `Total Microbreweries: ${totalMicrobreweries}`;









