//Author: Gurchetan
//course: Comp-165
//I hereby declare that this code is written by me and no resources have been used to copy other than those
//declared and acknowleged.


//Top level function that dynamically calls requiered functions onchange
document.addEventListener('DOMContentLoaded',async function(){
    document.querySelector('#drop-down').onchange = async function() {
        try {
            await fetchWeather();
        } catch (error) {
            console.log(error);
            
        }
    };
})
//function to fetch current weather()

async function fetchWeather() {
    try {
        let city = await get_city();
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=400494431950404bb3901146240102&q=${city}&aqi=no`);
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
            <h1>Current Weather</h1>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Temperature:</strong> ${temperature}</p>
            <p><strong>Condition:</strong> ${condition}</p>
            <h1>7 Day forecast</h1>
        `;
        //calling another function defined below to get forecast
        await get_forecast(city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display error message on the webpage
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
}
//function to get forecast of n days n being api parameter for days
async function get_forecast(city) {
    const weatherContainer = document.getElementById('weather-forecast-container');
    try {
        weatherContainer.innerHTML = ``;
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=66b0dcfcd4814636a7503446240202&q=${city}&days=7&aqi=no&alerts=no`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        data.forecast.forecastday.forEach((dayData) => {
            const date = dayData.date;
            const temp = dayData.day.avgtemp_c;
            const condition = dayData.day.condition.text;
            
            weatherContainer.innerHTML += `
                <p><u><strong>Date:</strong>${date}</u></p>
                <p><strong>Temperature:</strong>${temp}°C</p>
                <p><strong>Condition:</strong> ${condition}</p>
            `;
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display error message on the webpage
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
}
//function to get city name from menu
async function get_city() { 
    let selected_label = document.getElementById("drop-down");
    let city = selected_label.value;
    return city;
}
