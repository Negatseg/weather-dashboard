const apiKey = "1d9d62ac9684ac5f4f6d51631cc28327";
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const historyList = document.getElementById('history-list');

let searchHistory = [];

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`);
        const data = await response.json();

        // // Display the current weather data
        // currentWeather.innerHTML = `
        //     <h2>Current Weather in ${city}</h2>
        //     <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
        //     <p>Humidity: ${data.main.humidity}%</p>
        //     <p>Weather: ${data.weather[0].description}</p>
        // `;
        async function fetchWeatherData() {
          try {
              const response = await fetch(apiUrl);
              const data = await response.json();
      
              // Update HTML elements with weather data
              document.getElementById('city-name').textContent = data.city.name;
              const weather = data.list[0];
              document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
              document.getElementById('temperature').textContent = `Temperature: ${weather.main.temp}°C`;
              document.getElementById('humidity').textContent = `Humidity: ${weather.main.humidity}%`;
              document.getElementById('wind-speed').textContent = `Wind Speed: ${weather.wind.speed} m/s`;
              const date = new Date(weather.dt * 1000);
              document.getElementById('date').textContent = date.toLocaleDateString();
      
          } catch (error) {
              console.error('Error fetching weather data:', error);
          }
      }
      
      fetchWeatherData();

        // Fetch forecast data or any other relevant data here and display it in the 'forecast' section

const forecastContainer = document.getElementById('forecast');

      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const forecasts = data.list;
        
                forecasts.slice(0, 5).forEach(forecast => {
                    const date = new Date(forecast.dt * 1000);
                    const iconCode = forecast.weather[0].icon;
                    const temperature = Math.round(forecast.main.temp);
                    const windSpeed = Math.round(forecast.wind.speed);
                    const humidity = forecast.main.humidity;
        
                    const weatherCard = document.createElement('div');
                    weatherCard.classList.add('weather-card');
                    weatherCard.innerHTML = `
                        <h2>${date.toDateString()}</h2>
                        <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon" class="weather-icon">
                        <p>Temperature: ${temperature}°C</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                        <p>Humidity: ${humidity}%</p>
                    `;
        
                    forecastContainer.appendChild(weatherCard);
                });
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to add a city to the search history
function addToHistory(city) {
    // Check if the city is already in the history
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        // Create a list item for the search history
        const listItem = document.createElement('li');
        listItem.textContent = city;
        // Add click event to search with the city again when clicked
        listItem.addEventListener('click', () => {
            cityInput.value = city;
            searchWeather(city);
        });
        // Add the list item to the history list
        historyList.appendChild(listItem);
    }
}

// Function to search for weather data when the form is submitted
function searchWeather(city) {
    getWeatherData(city);
    addToHistory(city);
    cityInput.value = ''; // Clear the input field
}

// Event listener for the form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        searchWeather(city);
    }
});

// Initialize the application with some default city, e.g., your current location
searchWeather('New York');



// Replace with the latitude and longitude of the city you want to fetch data for
const latitude = 'LATITUDE';
const longitude = 'LONGITUDE';

const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;







const city = 'YOUR_CITY_NAME'; // Replace with the city you want to get the forecast for






