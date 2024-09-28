const apiKey = 'faed1e16546df86d0740d979ed2e6c08'; // Replace with your OpenWeatherMap API key
const getWeatherButton = document.getElementById('get-weather-btn');
const getLocationButton = document.getElementById('get-location-btn');
const weatherInfo = document.getElementById('weather-info');
const locationInput = document.getElementById('location-input');

// Event listener for user-inputted location
getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    }
});

// Event listener for getting the user's current location
getLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, () => {
            weatherInfo.innerHTML = '<p>Unable to retrieve your location.</p>';
        });
    } else {
        weatherInfo.innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
});

// Fetch weather data based on user input
function fetchWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
        });
}

// Fetch weather data based on coordinates
function fetchWeatherByCoords(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
        });
}

// Display weather information
function displayWeather(data) {
    const { main, weather, name } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    
    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Conditions: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}
