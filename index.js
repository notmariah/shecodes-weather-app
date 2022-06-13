//current date & time
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

//current weather conditions
function showWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = `${temperature}`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#temp-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function searchLocation(position) {
  let apiKey = "89c4b4c6c243370cb32a6437b3bb99bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showWeatherCondition);
}

//city on load

function searchCity(city) {
  let units = "imperial";
  let apiKey = "89c4b4c6c243370cb32a6437b3bb99bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

//search engine

function cityInputSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

//current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", cityInputSearch);

searchCity("Denver");

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);
