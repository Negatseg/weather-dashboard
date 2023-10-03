
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");


const API_KEY = "1d9d62ac9684ac5f4f6d51631cc28327";

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) {
    return `<div class="details">
                <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2> 
                <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                <h4>Humidity: ${weatherItem.main.humidity} %</h4>
            </div>
            <div class="icon">
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="Weather-icon">
                <h4>${weatherItem.weather[0].description}</h4>
            </div>`;
  } else {
    return `<li class="card">
                <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="Weather-icon">
                <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                <h4>Humidity: ${weatherItem.main.humidity} %</h4>
            </li>`;
  }
}

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
      console.log(data);

      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt.txt).getDate();
        if(!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });


      cityInput.value = "";
      currentWeatherDiv.innerHTML = "";
      weatherCardsDiv.innerHTML = "";

      console.log(fiveDaysForecast);
      fiveDaysForecast.forEach((weatherItem, index) => {
        if(index === 0){
          currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName,weatherItem,index));
        }else{
          weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName,weatherItem,index));
        }  
      });
    }).catch(()=>{
      alert("an error occurred while fetching the coordinates");
    });
}

const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (!cityName) return;
  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
    if(!data.length) return alert('no coordinates found for ${cityName}');
    const {name, lat, lon} = data[0];
    getWeatherDetails(name,lat,lon);
  }).catch(()=>{
    alert("an error occurred while fetching the coordiantes");
  });
}

searchButton.addEventListener("click", getCityCoordinates);






// // Function to add a city to the search history
// function addToHistory(city) {
//     // Check if the city is already in the history
//     if (!searchHistory.includes(city)) {
//         searchHistory.push(city);
//         // Create a list item for the search history
//         const listItem = document.createElement('li');
//         listItem.textContent = city;
//         // Add click event to search with the city again when clicked
//         listItem.addEventListener('click', () => {
//             cityInput.value = city;
//             searchWeather(city);
//         });
//         // Add the list item to the history list
//         historyList.appendChild(listItem);
//     }
// }

// // Function to search for weather data when the form is submitted
// function searchWeather(city) {
//     getWeatherData(city);
//     addToHistory(city);
//     cityInput.value = ''; // Clear the input field
// }

// // Event listener for the form submission
// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const city = cityInput.value.trim();
//     if (city) {
//         searchWeather(city);
//     }
// });

// // Initialize the application with some default city, e.g., your current location
// searchWeather('New York');










