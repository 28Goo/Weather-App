import { getLocation ,getWeather, getCurrentWeather, getDailyWeather } from './api-functionalities';
import { capitalizeFirstLetter, resetInput, resetContainer } from './misc-functions'

function showCurrentWeather(current, daily, location) {
    // Select All Necessary Elements
    const icon = document.querySelector('.current-icon');
    const date = document.querySelector('.current-date');
    const place = document.querySelector('.current-location');
    const weatherDescription = document.querySelector('.current-weather-description');
    const currentTemp = document.querySelector('.current-temp');
    const pop = document.querySelector('.current-pop');
    const feelsLike = document.querySelector('.current-feels-like');
    const wind = document.querySelector('.current-wind');
    const humidity = document.querySelector('.current-humidity');

    // Add Text Content
    icon.src = `http://openweathermap.org/img/wn/${current.condition.icon}@2x.png`;
    date.textContent = new Date(current.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
    place.textContent = `${location.place.city}, ${location.place.country}`;
    weatherDescription.textContent = capitalizeFirstLetter(current.condition.description);
    currentTemp.textContent = `${current.temperature.temp}°C`;
    pop.textContent = `${daily[0].pop}%`
    feelsLike.textContent = `${current.temperature.feelsLike}°C`;
    wind.textContent = current.wind;
    humidity.textContent = `${current.humidity}%`;
}

function showWeatherTomorrow(data) {
    // Make data easier to access
    const tomorrow = data[1];

    // Select All Necessary Elements
    const icon = document.querySelector('.tomorrow-icon');
    const date = document.querySelector('.tomorrow-date');
    const weatherDescription = document.querySelector('.tomorrow-weather-description');
    const tempDay = document.querySelector('.tomorrow-temp-day');
    const tempNight = document.querySelector('.tomorrow-temp-night');
    const pop = document.querySelector('.tomorrow-pop');
    const feelsLikeDay = document.querySelector('.tomorrow-feels-like-day');
    const feelsLikeNight = document.querySelector('.tomorrow-feels-like-night');
    const wind = document.querySelector('.tomorrow-wind');
    const humidity = document.querySelector('.tomorrow-humidity');

    // Add Source and Text Content
    icon.src = `http://openweathermap.org/img/wn/${tomorrow.weather[0].icon}@2x.png`;
    date.textContent = new Date(tomorrow.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
    weatherDescription.textContent = capitalizeFirstLetter(tomorrow.weather[0].description);
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
        // Make data easier to access
        const day = days[i];
        
        // Create Elements
        const dailyWeather = document.createElement('div');
        const icon = document.createElement('img');
        const date = document.createElement('p');
        const weatherDescription = document.createElement('p');
        const tempDay = document.createElement('p');
        const tempNight = document.createElement('p');
        const pop = document.createElement('p');

        // Add Class to Elements
        dailyWeather.classList.add('daily-weather');
        icon.classList.add('daily-icon');
        date.classList.add('daily-date');
        weatherDescription.classList.add('daily-weather-description');
        tempDay.classList.add('daily-temp-day');
        tempNight.classList.add('daily-temp-night');
        pop.classList.add('daily-pop');
        
        // Add Source Text Content
        icon.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        date.textContent = new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
        weatherDescription.textContent = capitalizeFirstLetter(day.weather[0].description);
        tempDay.textContent = `${day.temp.day}°C`;
        tempNight.textContent = `${day.temp.night}°C`;
        pop.textContent = `${day.pop}%`;

        // Append Elements to Container
        dailyWeather.appendChild(icon);
        dailyWeather.appendChild(date);
        dailyWeather.appendChild(weatherDescription);
        dailyWeather.appendChild(tempDay);
        dailyWeather.appendChild(tempNight);
        dailyWeather.appendChild(pop);
        container.appendChild(dailyWeather);
    }
}

async function showWeather() {
    // Get Data from Async Functions
    const location = await getLocation().catch(error => { console.error(error) });
    
    if (!location) {
        alert('Cannot Find Location.');
        resetInput(location);
        return;
    }

    const data = await getWeather(location).catch(error => { console.error(error) });
    const currentWeather = await getCurrentWeather(data).catch(error => { console.error(error) });
    const dailyWeather = await getDailyWeather(data).catch(error => { console.error(error) });
    
    // Show Organized Weather Data
    console.log(location.place);
    showCurrentWeather(currentWeather, dailyWeather, location);
    showWeatherTomorrow(dailyWeather, location);
    showDailyWeather(dailyWeather);

    resetInput(location);
}

function renderAll() {
    const form = document.querySelector('.location-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        showWeather().catch(error => { console.error(error); }); 
    });
}

export { renderAll, showWeather }