
async function fetchWeather() {
try {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=400494431950404bb3901146240102&q=vancouver&aqi=no');
    if (!response.ok) {
        throw new Error('Network response was not ok');
}
const data = await response.json();

// Extract relevant weather information from the API response
const location = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
const temperature = data.current.temp_c + '°C';
const condition = data.current.condition.text;

// Display weather information on the webpage
const weatherContainer = document.getElementById('weather-container');
weatherContainer.innerHTML = `
    <h2>Weather for you </h2>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Temperature:</strong> ${temperature}</p>
    <p><strong>Condition:</strong> ${condition}</p>
`;
} catch (error) {
console.error('Error fetching weather data:', error);
// Display error message on the webpage
const weatherContainer = document.getElementById('weather-container');
weatherContainer.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
}
}

// Call the fetchWeather function when the page loads
document.addEventListener('DOMContentLoaded', fetchWeather);
