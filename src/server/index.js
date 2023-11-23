var path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));
app.use(cors());
console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }
  return next();
});

app.post("/geoName", getCoordinates);

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

async function getCoordinates(req, res) {
  const urlGeoName = process.env.URL_GEO;
  const userName = process.env.API_GEONAME;
  const finalUrl = `${urlGeoName}/searchJSON?q=${req.body.place}&username=${userName}&maxRows=10`;
  try {
    const response = await axios.get(finalUrl);
    const data = response.data;
    res.send(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

app.post("/weatherBit", getWeatherForecast);

async function getWeatherForecast(req, res) {
  const urlWeather = process.env.URL_WEATHER;
  const apiKey = process.env.API_WEATHER;
  const finalUrl = `${urlWeather}/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.lng}&key=${apiKey}`;
  console.log(finalUrl);
  try {
    const response = await axios.get(finalUrl);
    const data = response.data;
    res.send(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

app.post("/pixalBay", getImage);

async function getImage(req, res) {
  const urlImg = process.env.URL_PIXABAY;
  const apiKey = process.env.API_PIXABAY;
  const finalUrl = `${urlImg}/api/?key=${apiKey}&q=${req.body.city}&image_type=photo`;
  console.log(finalUrl);
  try {
    const response = await axios.get(finalUrl);
    const data = response.data;
    res.send(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
