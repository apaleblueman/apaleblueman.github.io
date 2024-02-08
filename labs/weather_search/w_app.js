//Author: Gurchetan
//course: Comp-165
//I hereby declare that this code is written by me and no resources have been used to copy other than those
//declared and acknowleged.

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
    // fetch_forecast();           
}


async function fetch_weather(){
    //fetch data using api
    let selected_city = get_user_city();
    const request = await fetch(`https://api.weatherapi.com/v1/current.json?key=400494431950404bb3901146240102&q=${selected_city}&aqi=no`);
    //formatting json data for better accessibilty
    data = await request.json();
    console.log(request)
    //display current city weather for today
    weather_div = document.getElementById('weather-container');
    const current_location = data.location.name;

    const current_region = data.location.region;
    if(current_region === null){
        current_region = (`, ${current_region}`)
    }
    const current_country = data.location.country;
    weather_div.innerHTML = `<h4>Location:${current_location} ${current_region} ${current_country}</h4>`;
}

function get_user_city(){
    let city_id = document.getElementById('drop-down').value;
    if (city_id === "Other"){
        city_id = document.getElementById('user-city').value;
    }
    return city_id;
}