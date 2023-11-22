function fillData(state, city, arr1, arr2) {
  var resultDiv = document.getElementById("results");
  for (var i = 0; i < arr1.length; i++) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card--head">
          <img src="${arr2[i].largeImageURL}" alt="desc img" />
          <div class="card--head__content">
            <strong>${city}</strong>
            <p>
              <em>${arr1[i].datetime}</em>
            </p>
            <p><b>State Code: </b>${state}</p>
        <p><b>Weather: </b>${arr1[i].weather.description}</p>
        <p><b>Temp: </b>${arr1[i].temp}</p>
          </div>
        </div>      
      `;
    resultDiv.appendChild(card);
  }
}

export { fillData };
