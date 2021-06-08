function getDate() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let dayIndex = now.getDay();
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

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

let currentTime = document.querySelector("#currentdate");
currentTime.innerHTML = getDate();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
