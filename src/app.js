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

  let forecastHTML = `<div class="row group-days px-md-5">`;
  forecast.forEach(function (forecastDay, index) {
    // if (index < 6) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-md g-3 border-0">
        <ul class="list-group list-group-flush">
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
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
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
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}

function searchLocation(position) {
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
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

function displayLondon(event) {
  event.preventDefault();
  let showLondon = document.querySelector("#star-city");
  showLondon.innerHTML = "London";
}
let clickLondon = document.querySelector("#city-london");
clickLondon.addEventListener("click", displayLondon);

function lookUpLondon(event) {
  let city = "London";
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickLondon.addEventListener("click", lookUpLondon);

function displayTokyo(event) {
  event.preventDefault();
  let showTokyo = document.querySelector("#star-city");
  showTokyo.innerHTML = "Tokyo";
}
let clickTokyo = document.querySelector("#city-tokyo");
clickTokyo.addEventListener("click", displayTokyo);

function lookUpTokyo(event) {
  let city = "Tokyo";
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickTokyo.addEventListener("click", lookUpTokyo);

function displayNewYork(event) {
  event.preventDefault();
  let showNewYork = document.querySelector("#star-city");
  showNewYork.innerHTML = "New York";
}
let clickNewYork = document.querySelector("#city-newYork");
clickNewYork.addEventListener("click", displayNewYork);

function lookUpNewYork(event) {
  let city = "New York";
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickNewYork.addEventListener("click", lookUpNewYork);

function displayReykjavik(event) {
  event.preventDefault();
  let showReykjavik = document.querySelector("#star-city");
  showReykjavik.innerHTML = "Reykjavik";
}
let clickReykjavik = document.querySelector("#city-reykjavik");
clickReykjavik.addEventListener("click", displayReykjavik);

function lookUpReykjavik(event) {
  let city = "Reykjavik";
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickReykjavik.addEventListener("click", lookUpReykjavik);

function displayLagos(event) {
  event.preventDefault();
  let showLagos = document.querySelector("#star-city");
  showLagos.innerHTML = "Lagos";
}
let clickLagos = document.querySelector("#city-lagos");
clickLagos.addEventListener("click", displayLagos);

function lookUpLagos(event) {
  let city = "Lagos";
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
clickLagos.addEventListener("click", lookUpLagos);

search("Austin");

let currentHour = new Date().getHours();
let currentScreenSize = window.innerWidth;

if (currentHour < 12 && currentScreenSize < 768) {
  document.querySelector(".container").style.background =
    "linear-gradient(to top, #db9a16, #b5652b, #7f3d2e, #422022, #000000)";
  document.querySelector(".container").style.backgroundPosition = "center";
  document.querySelector(".container").style.backgroundRepeat = "no-repeat";
  document.querySelector(".container").style.boxShadow =
    "0px 15px 13px -7px #000000";
  document.querySelector(".list-group-item").style.backgroundColor = "#d3ab7e";
} else if (currentHour < 24 && currentScreenSize < 768) {
  document.querySelector(".container").style.background =
    "linear-gradient(to top, #d1cece, #989696, #636262, #323232, #000000)";
  document.querySelector(".container").style.backgroundPosition = "center";
  document.querySelector(".container").style.backgroundRepeat = "no-repeat";
  document.querySelector(".container").style.boxShadow =
    "0px 15px 13px -7px #000000";
  document.querySelector(".list-group-item").style.backgroundColor = "#bab8b8";
}

// function changeFont() {
//   let element = document.getElementById("star-city");
//   element.style.fontSize = "58px";

//   if (element >=  )

// }

// str.length;

// const input = document.querySelector("#search-form-input");
// const output = document.querySelector("#star-city");
// const outputContainer = document.querySelector(".container");

// const resizeToFfit = () => {
//   let fontSize = window.getComputedStyle(output).fontSize;
//   output.style.fontSize = parseFloat(fontSize) - 1 + "px";

//   if (output.clientHeight >= outputContainer.clientHeight) {
//     resizeToFfit();
//   }
// };

// function processInput() {
//   output.innerHTML = this.value;
//   output.style.fontSize = "58px";
//   resizeToFfit();
// }

// input.addEventListener("input", processInput);
