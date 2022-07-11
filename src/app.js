function formatDate(timestamp) {
  let date = new Date(timestamp);
  let number = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${month} ${number} ${year} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row group-days">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-md g-3">
        <ul class="list-group list-group-flush border-0">
          <li class="list-group-item" style="border: none" id="day-week">
          <span class="weather-forecast-day">${formatDay(forecastDay.dt)}</span>
          </li>
          <li class="list-group-item" style="border: none" id="emoji-week">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
              />
          </li>
          <li
              class="list-group-item"
              style="border: none"
              id="high-low-week">
              <span class="highs" id="high-weekday">${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="lows" id="low-weekday">${Math.round(
                forecastDay.temp.min
              )}° </span>
          </li>
        </ul>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherConditions(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#star-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-day-date-time");
  let iconElement = document.querySelector("#current-emoji");
  let feelsElement = document.querySelector("#feels-like-temp");

  fahrenheitTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}

function searchLocation(position) {
  let apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#press-two");
currentButton.addEventListener("click", getCurrentLocation);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let form = document.querySelector("#search-form-input");
form.addEventListener("submit", handleSubmit);

let clickFahrenheit = document.querySelector("#fahrenheit-link");
clickFahrenheit.addEventListener("click", showFahrenheit);

let clickCelsius = document.querySelector("#celsius-link");
clickCelsius.addEventListener("click", showCelsius);

function displayAustin(event) {
  event.preventDefault();
  let showAustin = document.querySelector("#star-city");
  showAustin.innerHTML = "Austin";
}
let clickAustin = document.querySelector("#city-austin");
clickAustin.addEventListener("click", displayAustin);

function lookUpAustin(event) {
  let city = "Austin";
  let apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickAustin.addEventListener("click", lookUpAustin);

function displayDallas(event) {
  event.preventDefault();
  let showDallas = document.querySelector("#star-city");
  showDallas.innerHTML = "Dallas";
}
let clickDallas = document.querySelector("#city-dallas");
clickDallas.addEventListener("click", displayDallas);

function lookUpDallas(event) {
  let city = "Dallas";
  let apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickDallas.addEventListener("click", lookUpDallas);

function displayElPaso(event) {
  event.preventDefault();
  let showElPaso = document.querySelector("#star-city");
  showElPaso.innerHTML = "El Paso";
}
let clickElPaso = document.querySelector("#city-elPaso");
clickElPaso.addEventListener("click", displayElPaso);

function lookUpElPaso(event) {
  let city = "El Paso";
  let apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickElPaso.addEventListener("click", lookUpElPaso);

function displayHouston(event) {
  event.preventDefault();
  let showHouston = document.querySelector("#star-city");
  showHouston.innerHTML = "Houston";
}
let clickHouston = document.querySelector("#city-houston");
clickHouston.addEventListener("click", displayHouston);

function lookUpHouston(event) {
  let city = "Houston";
  let apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickHouston.addEventListener("click", lookUpHouston);

function displaySanAntonio(event) {
  event.preventDefault();
  let showSanAntonio = document.querySelector("#star-city");
  showSanAntonio.innerHTML = "San Antonio";
}
let clickSanAntonio = document.querySelector("#city-sanAntonio");
clickSanAntonio.addEventListener("click", displaySanAntonio);

function lookUpSanAntonio(event) {
  let city = "San Antonio";
  let apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickSanAntonio.addEventListener("click", lookUpSanAntonio);

search("Austin");
