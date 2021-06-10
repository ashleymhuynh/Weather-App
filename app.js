//global variables
let descriptionElement = document.getElementById("weather-description");
let iconElement = document.getElementById("weather-icon");
let highTempElement = document.getElementById("currenthightemp");
let lowTempElement = document.getElementById("currentlowtemp");
let temperatureElement = document.querySelector("#currenttemp");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dayone = document.getElementById("future-date1");
let daytwo = document.getElementById("future-date2");
let daythree = document.getElementById("future-date3");
let dayfour = document.getElementById("future-date4");
let dayfive = document.getElementById("future-date5");

function getDate() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let dayIndex = now.getDay();
  let daysofWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = daysofWeek[dayIndex];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  restOfWeek();
  return `${currentDay}, ${hours}:${minutes}`;
}

function restOfWeek() {}

let currentTime = document.querySelector("#currentdate");
currentTime.innerHTML = getDate();

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#searched-city");
  let currentCity = document.querySelector("#current-city");
  //display city name
  currentCity.innerHTML = inputCity.value;
  fetchData(inputCity.value);
  //cler input value
  inputCity.value = "";
}

async function fetchData(inputCity) {
  const apiKey = "650fb9db077f61ca16fc2d3df93a734e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=imperial`;
  let futureUrl = `http://api.openweathermap.org/data/2.5/find?q=${inputCity}&units=imperial&appid=650fb9db077f61ca16fc2d3df93a734e`;
  try {
    const response = await axios.get(apiUrl);
    const futureResponse = await axios.get(futureUrl);
    const cityInfo = response.data;
    const futureInfo = futureResponse.data.list;
    console.log(cityInfo);
    console.log(futureResponse.data.list);
    displayTemperature(cityInfo, futureInfo);
  } catch (error) {
    console.error(error.message);
  }
}

function displayTemperature(cityInfo, futureInfo) {
  let description = cityInfo.weather[0].description;
  descriptionElement.innerHTML = description;
  let icon = cityInfo.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", description);

  currentTemp = cityInfo.main;

  let highTemp = Math.round(cityInfo.main.temp_max);
  let lowTemp = Math.round(cityInfo.main.temp_min);
  highTempElement.innerHTML = `${highTemp}º`;
  lowTempElement.innerHTML = `${lowTemp}º`;
  let temp = Math.round(currentTemp.temp);
  temperatureElement.innerHTML = temp;
  let humidity = Math.round(cityInfo.main.humidity);
  humidityElement.innerHTML = `${humidity}%`;
  let windSpeed = Math.round(cityInfo.wind.speed);
  windElement.innerHTML = windSpeed;

  let futurehightemp1 = document.getElementById("futurehightemp1");
  futurehightemp1.innerHTML = `${futureInfo[0].main.temp}º`;
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currenttemp");
  let celsiusTemp = ((currentTemp.temp - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemp);
  highTempElement.innerHTML = `${Math.round(
    ((currentTemp.temp_max - 32) * 5) / 9
  )}º`;
  lowTempElement.innerHTML = `${Math.round(
    ((currentTemp.temp_min - 32) * 5) / 9
  )}º`;

  //remove active class in the ferh link
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currenttemp");
  tempElement.innerHTML = Math.round(currentTemp.temp);
  highTempElement.innerHTML = `${Math.round(currentTemp.temp_max)}º`;
  lowTempElement.innerHTML = `${Math.round(currentTemp.temp_min)}º`;
}

//   let messageElement = document.querySelector(“#message”);
//   if (highTemp <= 70) {
//     messageElement.innerHTML = ““;
//   } else {
//     messageElement.innerHTML = ““;
//   }
// }

let currentTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

fetchData("Los Angeles");
