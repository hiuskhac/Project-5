async function handleSubmit(event) {
  event.preventDefault();
  const dateTravel = document.getElementById("date-travel").value;
  const place = document.getElementById("place").value;
  if (Client.checkInput(dateTravel, place)) {
    if (Client.checkValidDate(dateTravel)) {
      const resGeoName = await postData("http://localhost:8080/geoName", {
        place: place,
      });
      const resWeatherBit = await postData("http://localhost:8080/weatherBit", {
        lat: resGeoName.geonames[0].lat,
        lng: resGeoName.geonames[0].lng,
      });
      // Convert inputDate to a Date object.
      const inputDateObject = new Date(dateTravel);
      // Get the timestamp of inputDate and add 1 day = 24 hours.
      const nextDayTimestamp =
        inputDateObject.getTime() + 1 * 24 * 60 * 60 * 1000;
      /// Create a Date object for nextDay.
      const nextDay = new Date(nextDayTimestamp);
      // Convert to format "YYYY-MM-DD"
      const nextDayFormatted = nextDay.toISOString().split("T")[0];

      const weatherForcastInfo = resWeatherBit.data.filter(
        (rs) => rs.datetime === nextDayFormatted || rs.datetime === dateTravel
      );
      const resPixalBay = await postData("http://localhost:8080/pixalBay", {
        city: place,
      });
      Client.fillData(
        resWeatherBit.state_code,
        place,
        weatherForcastInfo,
        resPixalBay.hits
      );
    } else {
      console.log("Date travel is error!");
      document.getElementById("results").innerHTML = "";
    }
  } else {
    console.log("Please fill all input fields!");
    document.getElementById("results").innerHTML = "";
  }
}

export async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export { handleSubmit };
