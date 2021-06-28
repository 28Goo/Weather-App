import { getLocation ,getWeather, getCurrentWeather, getDailyWeather } from './api-functionalities';
import { capitalizeFirstLetter, resetInput, resetContainer } from './misc-functions'
// TODOS
function showCurrentWeather(current, daily, location) {
    // Select All Necessary Elements
    const dt = document.querySelector('.current-date');
    const place = document.querySelector('.current-location');
    const weatherDescription = document.querySelector('.current-weather-description');
    const currentTemp = document.querySelector('.current-temp');
    const pop = document.querySelector('.current-pop');
    const feelsLike = document.querySelector('.current-feels-like');
    const wind = document.querySelector('.current-wind');
    const humidity = document.querySelector('.current-humidity');

    // Display Data
    dt.textContent = new Date(current.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
    place.textContent = location.place.city;
    weatherDescription.textContent = capitalizeFirstLetter(current.condition.description);
    currentTemp.textContent = `${current.temperature.temp}°C`;
    pop.textContent = `${daily[0].pop}%`
    feelsLike.textContent = `${current.temperature.feelsLike}°C`;
    wind.textContent = current.wind;
    humidity.textContent = `${current.humidity}%`;
}

function showWeatherTomorrow(data, location) {
    // Make data easier to access
    const tomorrow = data[1];

    // Select All Necessary Elements
    const dt = document.querySelector('.tomorrow-date');
    const place = document.querySelector('.tomorrow-location');
    const weatherDescription = document.querySelector('.tomorrow-weather-description');
    const tempDay = document.querySelector('.tomorrow-temp-day');
    const tempNight = document.querySelector('.tomorrow-temp-night');
    const pop = document.querySelector('.tomorrow-pop');
    const feelsLikeDay = document.querySelector('.tomorrow-feels-like-day');
    const feelsLikeNight = document.querySelector('.tomorrow-feels-like-night');
    const wind = document.querySelector('.tomorrow-wind');
    const humidity = document.querySelector('.tomorrow-humidity');

    // Display Data
    dt.textContent = new Date(tomorrow.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
    place.textContent = location.place.city;
    weatherDescription.textContent = tomorrow.weather[0].description;
    tempDay.textContent = `${tomorrow.temp.day}°C`;
    tempNight.textContent = `${tomorrow.temp.night}°C`;
    pop.textContent = `${tomorrow.pop}%`;
    feelsLikeDay.textContent = `${tomorrow.feels_like.day}°C`;
    feelsLikeNight.textContent = `${tomorrow.feels_like.night}°C`;
    wind.textContent = tomorrow.wind_speed;
    humidity.textContent = `${tomorrow.humidity}%`;
}

function showDailyWeather(days) {
    const container = document.querySelector('.daily-weather-container');
    resetContainer(container);
    for (let i = 2; i < days.length; i++) {
        console.log('Daily', i, days[i]);
        
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
    console.log('Current Weather: ', currentWeather);
    showCurrentWeather(currentWeather, dailyWeather, location);
    showWeatherTomorrow(dailyWeather, location);
    showDailyWeather(dailyWeather);
    resetInput();
}

function renderAll() {
    const form = document.querySelector('.location-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        showWeather().catch(error => {
            console.error(error);
        }); 
    });
}

export { renderAll, showWeather }