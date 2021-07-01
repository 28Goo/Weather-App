import key from "../../config";

const APIKEY = key;    

// Set Default Place
const input = document.getElementById('query-location');
input.value = 'Manila';

async function getLocation() {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIKEY}`, {mode: 'cors'});
    const data = await response.json();
    const location = {
        coords : {
            lat: data.coord.lat, 
            lon: data.coord.lon    
        },
        place : {
            city: data.name,
            country: data.sys.country
        }
    };
    return location;
}

async function getWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.lat}&lon=${location.coords.lon}&exclude=minutely&units=metric&appid=${APIKEY}`, {mode: 'cors'});
    return response.json();
}

async function getCurrentWeather(data) {
    return data.current;
}

async function getDailyWeather(data) {
    return data.daily;
}

export { getLocation, getWeather, getCurrentWeather, getDailyWeather };