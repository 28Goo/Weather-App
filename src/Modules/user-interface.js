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
    wind.textContent = `${current.wind}m/s`;
    humidity.textContent = `${current.humidity}%`;
}

function showDailyWeather(days) {
    const container = document.querySelector('.daily-weather-container');
    resetContainer(container);

    for (let i = 1; i < days.length; i++) {
        // Make data easier to access
        const day = days[i];
        
        // Create Containers
        const dailyWeather = document.createElement('div');
        const dateContainer = document.createElement('div');
        const iconContainer = document.createElement('div');
        const tempContainer = document.createElement('div');

        // Create Elements Inside Containers
        const date = document.createElement('p');
        const icon = document.createElement('img');
        const tempDay = document.createElement('p');
        const tempNight = document.createElement('p');

        // Add Class to Elements
        dailyWeather.classList.add('daily-weather');
        dateContainer.classList.add('daily-date-container');
        iconContainer.classList.add('daily-icon-container');
        tempContainer.classList.add('daily-temp-container');
        date.classList.add('daily-date');
        icon.classList.add('daily-icon');
        tempDay.classList.add('daily-temp-day');
        tempNight.classList.add('daily-temp-night');
        
        // Add Source Text Content
        date.textContent = new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
        icon.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        tempDay.textContent = `${day.temp.day}°`;
        tempNight.textContent = `${day.temp.night}°`;

        // Append Elements to Container
        dailyWeather.appendChild(dateContainer);
        dailyWeather.appendChild(iconContainer);
        dailyWeather.appendChild(tempContainer);
        dateContainer.appendChild(date);
        iconContainer.appendChild(icon);
        tempContainer.appendChild(tempDay);
        tempContainer.appendChild(tempNight);
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
    showCurrentWeather(currentWeather, dailyWeather, location);
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