// const apiUrl = "https://api.openbrewerydb.org/breweries";
// const resultsPerPage = 30;

// async function getAllBreweries() {
//   let allBreweries = [];
//   let page = 1;
//   let moreBreweriesAvailable = true;

//   while (moreBreweriesAvailable) {
//     const response = await fetch(
//       `${apiUrl}?page=${page}&per_page=${resultsPerPage}`
//     );
//     const data = await response.json();
//     allBreweries = allBreweries.concat(data);

//     if (data.length < resultsPerPage) {
//       moreBreweriesAvailable = false;
//     } else {
//       page++;
//     }
//   }

//   return allBreweries;
// }

// getAllBreweries().then((breweries) => {
//   console.log(breweries);
// });

// .catch((error) => console.log(error));

// function buildBreweryList(arr) {
//   for (let i = 0; i < breweryArray.length; i++) {
//     const brewBox = document.createElement("div");
//     brewBox.classList.add("brewBox");
//     showcase.append(brewBox);

//     const iconBox = document.createElement("div");
//     iconBox.classList.add("iconBox");
//     brewBox.append(iconBox);

// const favIcon = document.createElement('i');
// favIcon.className ="fa-solid fa-beer-mug-empty";
// iconBox.append(favIcon);

// const beerTab = document.createElement("img");
// beerTab.setAttribute("data-select", "");
// beerTab.className = "beerTab";
// beerTab.setAttribute("title", "Favorite");
// beerTab.src = "/images/beer_tab.png";
// iconBox.append(beerTab);

// const brewInfo = document.createElement("div");
// brewInfo.classList.add("brewInfo");
// brewBox.append(brewInfo);

// const brewName = document.createElement("h3");
// brewName.textContent = arr[i].name;
// brewInfo.append(brewName);

// const cityDiv = document.createElement("div");
// cityDiv.classList.add("cityDiv");
// const cityText = document.createElement("h5");
// cityText.textContent = `${arr[i].city}, ${arr[i].state}`;
// brewBox.append(cityDiv);
// cityDiv.append(cityText);

// const webAddress = document.createElement("div");
// webAddress.classList.add("webAddress");
// const webText = document.createElement("a");

// if (arr[i].website_url) {
//   webText.href = arr[i].website_url;
//   webText.textContent = 'Click to visit website';
// } else { webText.textContent = 'No website available';}
// brewBox.append(webAddress);
// webAddress.append(webText);
// console.log(`breweryArray.[i]`);

// const iconBox = document.createElement("div");
// iconBox.classList.add("iconBox");
// brewBox.append(iconBox);

// const beerTab = document.createElement("img");
// beerTab.setAttribute("data-select", "");
// beerTab.className = "beerTab";
// beerTab.setAttribute("title", "Favorite");
// beerTab.src = "/images/beer_tab.png";
// iconBox.append(beerTab);

// const brewInfo = document.createElement("div");
// brewInfo.classList.add("brewInfo");
// brewBox.append(brewInfo);

// const brewName = document.createElement("h3");
// brewName.textContent = item.name;
// brewInfo.append(brewName);
