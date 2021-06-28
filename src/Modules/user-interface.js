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
    const dt = document.querySelector('.current-date');
    const place = document.querySelector('.location');
    const weatherDescription = document.querySelector('.current-weather-description');
    const currentTemp = document.querySelector('.current-temp');
    const wind = document.querySelector('.wind');
    const feelsLike = document.querySelector('.feels-like');
    const humidity = document.querySelector('.humidity');

    // Display Data
    dt.textContent = new Date(current.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
    place.textContent = location.place.city;
    currentTemp.textContent = `${current.temperature.temp}°C`;
    feelsLike.textContent = `${current.temperature.feelsLike}°C`;
    weatherDescription.textContent = capitalizeFirstLetter(current.condition.description);
    wind.textContent = current.wind;
    humidity.textContent = current.humidity;
}

function showWeatherTomorrow(data) {
    const container = document.querySelector('.weather-tomorrow');
    console.log(data[0]);
    
    const weatherTomorrow = document.createElement('div');
    weatherTomorrow.textContent = data[0].temp.day;
    container.appendChild(weatherTomorrow);
}

function showDailyWeather(days) {
    const container = document.querySelector('.daily-weather-container');
    for (let i = 1; i < days.length; i++) {
        console.log(i, days[i]);
        
        const dailyWeather = document.createElement('div');
        dailyWeather.classList.add('daily-weather');
        dailyWeather.textContent = days[i].temp.day;
        container.appendChild(dailyWeather);
    }
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
    showWeatherTomorrow(dailyWeather);
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