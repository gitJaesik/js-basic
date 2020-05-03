const weather = document.querySelector(".js-weather");

const API_KEYS = "37613e8dcbae111b4dabd3c453b5325a";

const COORDS = "coords";

function getWeather(lat, log) {
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEYS}`
  //   );
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEYS}&units=metric&lang=kr`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const temperature = data.main.temp;
      const desc = data.weather[0].description;
      const place = data.name;
      weather.innerHTML = `${temperature}℃ / ${desc} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(error) {
  if (error.code === 1) {
    //   console.log(error.message);
    weather.innerHTML = "You don't wanna give me geolocation";
  } else {
    weather.innerHTML = "Unexpected Error";
  }
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
