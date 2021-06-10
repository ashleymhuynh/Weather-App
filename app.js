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
let futureHighTemp1Element = document.getElementById("futurehightemp1");
let futureHighTemp2Element = document.getElementById("futurehightemp2");
let futureHighTemp3Element = document.getElementById("futurehightemp3");
let futureHighTemp4Element = document.getElementById("futurehightemp4");
let futureHighTemp5Element = document.getElementById("futurehightemp5");

let futureLowTemp1Element = document.getElementById("futurelowtemp1");
let futureLowTemp2Element = document.getElementById("futurelowtemp2");
let futureLowTemp3Element = document.getElementById("futurelowtemp3");
let futureLowTemp4Element = document.getElementById("futurelowtemp4");
let futureLowTemp5Element = document.getElementById("futurelowtemp5");

let futureIcon1 = document.getElementById("futureicon1");
let futureIcon2 = document.getElementById("futureicon2");
let futureIcon3 = document.getElementById("futureicon3");
let futureIcon4 = document.getElementById("futureicon4");
let futureIcon5 = document.getElementById("futureicon5");

function getDate() {
  let now = new Date();
  let date = now.getDate();
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = daysofWeek[dayIndex];
  let month = months[now.getMonth()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${currentDay}, ${month} ${date} ${hours}:${minutes}`;
}

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
  let futureUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&units=imperial&appid=650fb9db077f61ca16fc2d3df93a734e`;
  try {
    const response = await axios.get(apiUrl);
    const futureResponse = await axios.get(futureUrl);
    const cityInfo = response.data;
    const futureInfo = futureResponse.data.list;
    console.log(cityInfo);
    console.log(futureInfo);
    displayTemperature(cityInfo);
    displayFutureWeather(futureInfo);
  } catch (error) {
    console.error(error.message);
  }
}

function displayTemperature(cityInfo, futureInfoArray) {
  let description = cityInfo.weather[0].description;
  descriptionElement.innerHTML = description;
  let icon = cityInfo.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", description);

  currentTemp = cityInfo.main;
  let temp = Math.round(currentTemp.temp);
  temperatureElement.innerHTML = temp;

  let highTemp = Math.round(cityInfo.main.temp_max);
  let lowTemp = Math.round(cityInfo.main.temp_min);
  highTempElement.innerHTML = `${highTemp}º`;
  lowTempElement.innerHTML = `${lowTemp}º`;
  let humidity = Math.round(cityInfo.main.humidity);
  humidityElement.innerHTML = `${humidity}%`;
  let windSpeed = Math.round(cityInfo.wind.speed);
  windElement.innerHTML = windSpeed;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[day];
}

function displayFutureWeather(futureInfo) {
  futureHighTemp1 = futureInfo[0].main.temp_max;
  futureLowTemp1 = futureInfo[0].main.temp_min;
  futureHighTemp2 = futureInfo[8].main.temp_max;
  futureLowTemp2 = futureInfo[8].main.temp_min;
  futureLowTemp3 = futureInfo[16].main.temp_min;
  futureHighTemp3 = futureInfo[16].main.temp_max;
  futureHighTemp4 = futureInfo[24].main.temp_max;
  futureLowTemp4 = futureInfo[24].main.temp_min;
  futureHighTemp5 = futureInfo[32].main.temp_max;
  futureLowTemp5 = futureInfo[32].main.temp_min;

  futureHighTemp1Element.innerHTML = `${Math.round(futureHighTemp1)}º`;
  futureLowTemp1Element.innerHTML = `${Math.round(futureLowTemp1)}º`;
  futureIcon1.src = `http://openweathermap.org/img/wn/${futureInfo[0].weather[0].icon}@2x.png`;

  let futureDate1 = document.querySelector("#future-date1 h4");
  futureDate1.innerText = `${formatDay(futureInfo[0].dt)}`;

  let futureDate2 = document.querySelector("#future-date2 h4");
  futureDate2.innerText = `${formatDay(futureInfo[8].dt)}`;

  let futureDate3 = document.querySelector("#future-date3 h4");
  futureDate3.innerText = `${formatDay(futureInfo[16].dt)}`;

  let futureDate4 = document.querySelector("#future-date4 h4");
  futureDate4.innerText = `${formatDay(futureInfo[24].dt)}`;

  let futureDate5 = document.querySelector("#future-date5 h4");
  futureDate5.innerText = `${formatDay(futureInfo[32].dt)}`;

  futureHighTemp2Element.innerHTML = `${Math.round(futureHighTemp2)}º`;
  futureLowTemp2Element.innerHTML = `${Math.round(futureLowTemp2)}º`;
  futureIcon2.src = `http://openweathermap.org/img/wn/${futureInfo[8].weather[0].icon}@2x.png`;

  futureHighTemp3Element.innerHTML = `${Math.round(futureHighTemp3)}º`;
  futureLowTemp3Element.innerHTML = `${Math.round(futureLowTemp3)}º`;
  futureIcon3.src = `http://openweathermap.org/img/wn/${futureInfo[16].weather[0].icon}@2x.png`;

  futureHighTemp4Element.innerHTML = `${Math.round(futureHighTemp4)}º`;
  futureLowTemp4Element.innerHTML = `${Math.round(futureLowTemp4)}º`;
  futureIcon4.src = `http://openweathermap.org/img/wn/${futureInfo[24].weather[0].icon}@2x.png`;

  futureHighTemp5Element.innerHTML = `${Math.round(futureHighTemp5)}º`;
  futureLowTemp5Element.innerHTML = `${Math.round(futureLowTemp5)}º`;
  futureIcon5.src = `http://openweathermap.org/img/wn/${futureInfo[32].weather[0].icon}@2x.png`;
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
  futureHighTemp1Element.innerHTML = `${Math.round(
    ((futureHighTemp1 - 32) * 5) / 9
  )}º`;
  futureHighTemp2Element.innerHTML = `${Math.round(
    ((futureHighTemp2 - 32) * 5) / 9
  )}º`;
  futureHighTemp3Element.innerHTML = `${Math.round(
    ((futureHighTemp3 - 32) * 5) / 9
  )}º`;
  futureHighTemp4Element.innerHTML = `${Math.round(
    ((futureHighTemp4 - 32) * 5) / 9
  )}º`;
  futureHighTemp5Element.innerHTML = `${Math.round(
    ((futureHighTemp5 - 32) * 5) / 9
  )}º`;

  futureLowTemp1Element.innerHTML = `${Math.round(
    ((futureLowTemp1 - 32) * 5) / 9
  )}º`;
  futureLowTemp2Element.innerHTML = `${Math.round(
    ((futureLowTemp2 - 32) * 5) / 9
  )}º`;
  futureLowTemp3Element.innerHTML = `${Math.round(
    ((futureLowTemp3 - 32) * 5) / 9
  )}º`;
  futureLowTemp4Element.innerHTML = `${Math.round(
    ((futureLowTemp4 - 32) * 5) / 9
  )}º`;
  futureLowTemp5Element.innerHTML = `${Math.round(
    ((futureLowTemp5 - 32) * 5) / 9
  )}º`;
  //remove active class in the ferh link
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currenttemp");
  tempElement.innerHTML = Math.round(currentTemp.temp);
  highTempElement.innerHTML = `${Math.round(currentTemp.temp_max)}º`;
  lowTempElement.innerHTML = `${Math.round(currentTemp.temp_min)}º`;
  futureHighTemp1Element.innerHTML = `${Math.round(futureHighTemp1)}º`;
  futureLowTemp1Element.innerHTML = `${Math.round(futureLowTemp1)}º`;
  futureHighTemp2Element.innerHTML = `${Math.round(futureHighTemp2)}º`;
  futureLowTemp2Element.innerHTML = `${Math.round(futureLowTemp2)}º`;
  futureHighTemp3Element.innerHTML = `${Math.round(futureHighTemp3)}º`;
  futureLowTemp3Element.innerHTML = `${Math.round(futureLowTemp3)}º`;

  futureHighTemp4Element.innerHTML = `${Math.round(futureHighTemp4)}º`;
  futureLowTemp4Element.innerHTML = `${Math.round(futureLowTemp4)}º`;
  futureHighTemp5Element.innerHTML = `${Math.round(futureHighTemp5)}º`;
  futureLowTemp5Element.innerHTML = `${Math.round(futureLowTemp5)}º`;
}

//   let messageElement = document.querySelector(“#message”);
//   if (highTemp <= 70) {
//     messageElement.innerHTML = ““;
//   } else {
//     messageElement.innerHTML = ““;
//   }
// }

let currentTemp = null;
let futureHighTemp1 = null;
let futureHighTemp2 = null;
let futureHighTemp3 = null;
let futureHighTemp4 = null;
let futureHighTemp5 = null;
let futureLowTemp1 = null;
let futureLowTemp2 = null;
let futureLowTemp3 = null;
let futureLowTemp4 = null;
let futureLowTemp5 = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

fetchData("Los Angeles");
