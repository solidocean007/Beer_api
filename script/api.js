const apiUrl = "https://api.openbrewerydb.org/breweries";
const resultsPerPage = 30;

async function getAllBreweries() {
  let allBreweries = [];
  let page = 1;
  let moreBreweriesAvailable = true;

  while (moreBreweriesAvailable) {
    const response = await fetch(
      `${apiUrl}?by_state=north_carolina&page=${page}&per_page=${resultsPerPage}`
    );
    const data = await response.json();
    allBreweries = allBreweries.concat(data);

    if (data.length < resultsPerPage) {
      moreBreweriesAvailable = false;
    } else {
      page++;
    }
  }

  return allBreweries;
}

getAllBreweries().then((breweries) => {
  console.log(breweries);
});
