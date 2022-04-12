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

let currentTime = new Date();
let dateField = document.querySelector("h2");
dateField.innerHTML = formatDate(currentTime);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-default");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temp-default");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitTemp = null;

function search(city) {
  let apiKey = "5cdb8986f5f1ed79b448c4395c5f4e40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayWeather(response) {
  let cityField = document.querySelector("h1");

  cityField.innerHTML = response.data.name;
  // ^^ allows us to display the name and formatting that the API gives us after user types a city
  let roundedTemp = Math.round(response.data.main.temp);
  //^^displays the real-time temp of city searched in the temp field
  let tempDescription = document.querySelector("h3");
  tempDescription.innerHTML = response.data.weather[0].description;
  let tempSection = document.querySelector("#temp-default");
  let iconElement = document.querySelector(".weather-icon");

  fahrenheitTemp = response.data.main.temp;

  tempSection.innerHTML = roundedTemp;
  let windValue = document.querySelector("#wind-value");
  let humidityValue = document.querySelector("#humidity-value");
  windValue.innerHTML = Math.round(response.data.wind.speed);
  humidityValue.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchGeoLocation);
}

function searchGeoLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5cdb8986f5f1ed79b448c4395c5f4e40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}
let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getLocation);

search("Austin");
