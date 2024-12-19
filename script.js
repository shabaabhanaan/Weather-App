const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      weatherResult.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherResult.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const { temp, humidity } = main;
  const { description, icon } = weather[0];
  const { speed } = wind;

  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Condition:</strong> ${description}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Wind Speed:</strong> ${speed} m/s</p>
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
  `;
}
