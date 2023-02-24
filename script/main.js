const showcase = document.querySelector("section");
let breweryArray = [];
let favoriteArray = [];
const apiUrlNC =
  "https://api.openbrewerydb.org/breweries?by_state=north_carolina&per_page=30";

const invisible = "invisible";

fetch(apiUrlNC)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const brewBox = document.createElement("div");
      brewBox.classList.add("brewBox");
      brewBox.innerHTML = `
      <div class = 'iconBox'>
        <img data-select="" class="beerTab" title="Favorite" 
        src="/images/beer_tab.png">
      </div>
      <div class = 'brewInfo'>
        <h3>${item.name}</h3>
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
  });
  
showcase.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("beerTab")) {
    const div = target.parentElement.parentElement;
    div.classList.add(invisible);

    const ul = document.getElementById('favorites-list');
    const name = div.querySelector('.brewInfo').textContent;
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <i title = "remove" class="fa-solid fa-bookmark"></i>
    ${name}
    `
    ul.appendChild(listItem);

    // favoriteArray.push(div);
  }
  if (target.classList.contains('fa-bookmark')) {
    console.log(target);
    // const li = target.parentElement;
    // console.log(li);
    // const div = li.previousElementSibling;
    // li.remove();
    // div.classList.remove(invisible);
  }
});

