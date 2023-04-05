const showcase = document.querySelector("section");
let breweryArray = [];
let favoriteArray = [];
const apiUrlNC =
  "https://api.openbrewerydb.org/v1/breweries?by_state=north_carolina";

const invisible = "invisible";

function createCards(data) {
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
  })
};


function doSomethingStars() {
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
}

function doSomethingBrew() {
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


async function fetchData() {
  const response = await fetch(apiUrlNC);
  const data = await response.json();

  console.log(data);
  createCards(data);
  doSomethingStars();
  doSomethingBrew();
}
fetchData();

function sortCollection(direction) {
  const brewBoxes = document.querySelectorAll('.brewBox');
  const sortedBrewBoxes = Array.from(brewBoxes).sort((a, b) => {
    const [aName, bName] = [a, b].map((item) => item.querySelector('.brewInfo').textContent.trim());
    if (aName < bName) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aName > bName) {
      return direction === 'asc' ? 1 : -1;
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
    const condition = toggleButton.classList.contains('sorted-asc');
    const dir = condition ? 'desc' : 'asc'
    const params = condition
      ? ['sorted-asc', 'sorted-desc']
      : ['sorted-desc', 'sorted-asc'];
    sortCollection(dir);
    toggleButton.classList.remove(params[0]);
    toggleButton.classList.add(params[1]);
  });