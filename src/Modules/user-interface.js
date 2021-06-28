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

function showDailyWeather(days) {
    const container = document.querySelector('.daily-weather-container');
    days.forEach(day => {
        console.log(day);
        
        const dailyWeather = document.createElement('div');
        dailyWeather.classList.add('daily-weather');
        dailyWeather.textContent = day.temp.day;
        container.appendChild(dailyWeather);
    })
}

async function showWeather() {
    const location = await getLocation().catch(error => { console.error(error) });
    const data = await getWeather(location).catch(error => { console.error(error) });
    const currentWeather = await getCurrentWeather(data).catch(error => { console.error(error) });
    const dailyWeather = await getDailyWeather(data).catch(error => { console.error(error) });
    console.log('Data: ', data);
    console.log('Current Weather: ', currentWeather);
    console.log('Daily Weather:' ,dailyWeather);
    showCurrentWeather(currentWeather, location);
    showDailyWeather(dailyWeather);
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