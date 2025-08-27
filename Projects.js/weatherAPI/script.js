const API_KEY = "10494588edaec209793d717a64508893";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&q=`;

const form = document.getElementById("weatherForm");
const query = document.getElementById("inputCity");
const city = document.getElementById("city");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const img = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");
const weatherDiv = document.getElementById("weatherInfo");
const historyDiv = document.getElementById("history");
const chartCtx = document.getElementById("tempChart").getContext("2d");

let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
let tempChart;

function capitalizeFirstLetters(text) {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function getWeather(cityName) {
  try {
    const response = await fetch(URL + cityName);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
    addToHistory(cityName);
    getForecast(cityName);
  } catch (error) {
    errorMessage.innerText = "City not found. Try again.";
    weatherDiv.classList.add("hidden");
    console.error(error);
  }
}

function displayWeather(weatherData) {
  if (weatherData.cod === 200) {
    errorMessage.innerText = "";
    city.innerText = capitalizeFirstLetters(weatherData.name);
    description.innerText = weatherData.weather[0].description;
    temp.innerText = weatherData.main.temp + "°";

    // הצגת תמונה רק אם קיימת
    if (weatherData.weather[0].icon) {
      img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      img.style.display = "block"; // הופך לגלוי
    } else {
      img.style.display = "none"; // מוסתר אם אין תמונה
    }

    weatherDiv.classList.remove("hidden");
  } else {
    errorMessage.innerText = "City not found.. Try again";
    city.innerText = "";
    description.innerText = "";
    temp.innerText = "";
    img.style.display = "none"; // מוסתר במקרה של שגיאה
  }
}

// היסטוריית חיפושים
function addToHistory(cityName) {
  cityName = capitalizeFirstLetters(cityName);
  if (!history.includes(cityName)) {
    history.push(cityName);
    localStorage.setItem("weatherHistory", JSON.stringify(history));
    renderHistory();
  }
}

function renderHistory() {
  historyDiv.innerHTML = "";
  history.forEach((cityName) => {
    const btn = document.createElement("button");
    btn.innerText = cityName;
    btn.addEventListener("click", () => getWeather(cityName));
    historyDiv.appendChild(btn);
  });
}

// גרף תחזית
async function getForecast(cityName) {
  try {
    const response = await fetch(FORECAST_URL + cityName);
    if (!response.ok) throw new Error("Forecast not found");
    const data = await response.json();

    const labels = [];
    const temps = [];

    // נתוני חיזוי כל 3 שעות -> נוציא רק חיזוי יומי (כל 8 פריטים)
    for (let i = 0; i < data.list.length; i += 8) {
      labels.push(data.list[i].dt_txt.split(" ")[0]);
      temps.push(data.list[i].main.temp);
    }

    if (tempChart) tempChart.destroy();

    tempChart = new Chart(chartCtx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature °C",
            data: temps,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

// מאזין לטופס
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(query.value);
});

// טעינת היסטוריה קיימת
renderHistory();
