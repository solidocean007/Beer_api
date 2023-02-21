const showcase = document.querySelector("section");

const apiUrlNC =
  "https://api.openbrewerydb.org/breweries?by_state=north_carolina&per_page=30";
fetch(apiUrlNC)
  .then((response) => response.json())
  .then((responseJSon) => {
    console.log(responseJSon);
    for (let i = 0; i < responseJSon.length; i++) {
      const brewBox = document.createElement("div");
      brewBox.classList.add("brewBox");
      showcase.append(brewBox);

      const iconBox = document.createElement('div');
      iconBox.classList.add('iconBox');
      brewBox.append(iconBox);
      
      const favIcon = document.createElement('i');
      favIcon.className ="fa-solid fa-beer-mug-empty";
      iconBox.append(favIcon);


      const brewInfo = document.createElement("div");
      brewInfo.classList.add('brewInfo');
      brewBox.append(brewInfo);

      const brewName = document.createElement('h3');
      brewName.textContent = responseJSon[i].name;
      brewInfo.append(brewName);

      const cityDiv = document.createElement('div');
      cityDiv.classList.add('cityDiv');
      const cityText = document.createElement('h5');
      cityText.textContent = responseJSon[i].city;
      brewBox.append(cityDiv);
      cityDiv.append(cityText);
    }
  });
