import key from "../config";

const APIKEY = key;
const input = document.getElementById('query-location');

async function getLocation() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIKEY}`, {mode: 'cors'});
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

async function fetchData(location) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.lat}&lon=${location.coords.lon}&exclude=minutely&units=metric&appid=${APIKEY}`, {mode: 'cors'});
    return response.json();
}

function getCurrentWeather(data) {
    const currentWeather = {
        weather: {
            weatherCondition: data.current.weather[0].main,
            weatherDescrition: data.current.weather[0].description
        },
        temperature: {
            temp: data.current.temp,
            feelsLike: data.current.feels_like
        },
        condition: {
            description: data.current.weather[0].description,
            icon: data.current.weather[0].icon
        },
        wind: data.current.wind_speed,
        humidity: data.current.humidity,
    }
    return currentWeather;
}

function getDailyWeather(data) {
    return data.daily;
}

export { fetchData, getLocation, getCurrentWeather, getDailyWeather };