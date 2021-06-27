import { getLocation ,getWeather, getCurrentWeather, getDailyWeather } from './api-functionalities';

const form = document.querySelector('.location-form');
const input = document.getElementById('query-location');

function capitalizeFirstLetter(string) {
    let words = string.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
}

// TODOS
function showCurrentWeather(current, location) {
    // Select All Necessary Elements
    const place = document.querySelector('.location');
    const weatherDescription = document.querySelector('.current-weather-description');
    const currentTemp = document.querySelector('.current-temp');
    const wind = document.querySelector('.wind');
    const feelsLike = document.querySelector('.feels-like');
    const humidity = document.querySelector('.humidity');

    // Display Data
    place.textContent = location.place.city;
    currentTemp.textContent = `${current.temperature.temp}°C`;
    feelsLike.textContent = `${current.temperature.feelsLike}°C`;
    weatherDescription.textContent = capitalizeFirstLetter(current.condition.description);
    wind.textContent = current.wind;
    humidity.textContent = current.humidity;
}

// function showDailyWeather() {
    // unit = unitChecker(unit);
// }

async function showWeather() {
    const location = await getLocation();
    const data = await getWeather(location).catch(error => {
        console.error(error);
    });
    if (data.error) return;
    const currentWeather = getCurrentWeather(data);
    const dailyWeather = getDailyWeather(data);
    console.log(data);
    console.log('Daily Weather:' ,dailyWeather);
    showCurrentWeather(currentWeather, location);
    resetInput();   
}

function renderAll() {
    form.addEventListener('submit', e => {
        e.preventDefault();
        showWeather().catch(error => {
            console.error(error);
        }); 
    });
}

function resetInput() {
    input.placeholder = input.value;
    input.value = null;
}

export { renderAll, showWeather }