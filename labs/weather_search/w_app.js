//Author: Gurchetan
//course: Comp-165
//I hereby declare that this code is written by me.
//No resources have been used to copy other than those declared and acknowleged.

document.addEventListener('DOMContentLoaded',async function(){
    document.getElementById('drop-down').onchange = async function(){
        try{
            display_weather();
        }
        catch(error){

            console.log(error);
            

        }
    }
    document.getElementById('search').onclick = async function(){
        try{
            display_weather();
        }
        catch(error){

            console.log(error);
        }
    }
});

function display_weather(){
    //display weather and 7 day forecast
    fetch_weather();
    get_forecast();
}


async function fetch_weather(){
    //fetch data using api
    let selected_city = get_user_city();
    const request = await fetch(`https://api.weatherapi.com/v1/current.json?key=400494431950404bb3901146240102&q=${selected_city}&aqi=no`);
    //formatting json data for better accessibilty
    
    data = await request.json();
    console.log(request)
//Some error handling
    if(!request.ok) {
        if(selected_city != ""){
        weather_div = document.getElementById('weather-container');
        weather_div.innerHTML = "Sorry , that is an invalid name!";
        }
        else if(selected_city === "" && document.getElementById('drop-down').value === "Other"){
            weather_div.innerHTML = "Please enter a city name!";
        }
    }
    //display current city weather for today
    weather_div = document.getElementById('weather-container');
    let current_location_array = [data.location.name, data.location.region, data.location.country];
    let current_location = "";
    current_location_array.forEach(element => {
        if(element !== '<empty string>'){
            if(current_location_array.indexOf(element) !== 0){
                current_location += `,${element}`;
            }
            else{
                current_location += `${element}`;
            }
        }
    });
    const current_temp = data.current.temp_c;
    const current_condtion = data.current.condition.text;
    const current_condtion_icon = data.current.condition.icon
    weather_div.innerHTML = 
    `<table border='5px'>
    <tr>
    <td>
    <span><strong>Location</strong>: ${current_location}</span>
    <br><span><strong>Temperature:</strong> ${current_temp} &#176C</span>
    <br><span><strong>Condition:</strong> ${current_condtion} <br><img src="${current_condtion_icon}"></span>
    </td>
    </tr>
    </table>
    
    `;
}
async function get_forecast() {
    city = get_user_city();
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
            <table width=2px border=2px style="display:inline;">
                <td>
                <p><u><strong>Date:</strong>${date}</u></p>
                <p><strong>Temperature:</strong>${temp}°C</p>
                <p><strong>Condition:</strong> ${condition}</p>
                </td>

            </table>
                `;
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display error message on the webpage
        const weatherContainer = document.getElementById('weather-forecast-container');
        weatherContainer.innerHTML = '<p>Failed to fetch forecast weather data. Please check your input or try again later.</p>';
    }
}
function get_user_city(){
    let city_id = document.getElementById('drop-down').value;
    if (city_id === "Other"){
        city_id = document.getElementById('user-city').value;
    }
    return city_id;
}