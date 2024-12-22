const API_KEY = "10494588edaec209793d717a64508893";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
const query = document.getElementById("inputCity");
const city = document.getElementById("city");
const button = document.querySelector("button");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const img = document.querySelector("img");
const errorMessage = document.getElementById("errorMessage");

async function getWeather(city) {
  try {
    const response = await fetch(URL + city); // 1.5 s respone = undefind
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error(error);
  }
}
// פונקציית עזר להפיכת אות ראשונה במילה לאות קפיטל
function capitalizeFirstLetters(text) {
  if (!text) return '';

  const capitalizedString = text.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return capitalizedString;
}

function displayWeather(weatherData) {
  if (weatherData.cod === 200) {
    errorMessage.innerText = "";
    city.innerText = capitalizeFirstLetters(query.value);
    description.innerText = weatherData.weather[0].description;
    temp.innerText = weatherData.main.temp + "°";
    img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  } else {
    errorMessage.innerText = "City not found.. Try again";
    city.innerText = "";
    description.innerText = "";
    temp.innerText = "";
    img.src = "";
  }
}

button.addEventListener("click", () => {
  getWeather(query.value);
});
