import { getLocation ,getWeather, getCurrentWeather, getDailyWeather } from './api-functionalities';
import { capitalizeFirstLetter, resetInput, resetContainer } from './misc-functions'

function changeBg(data, container) {
    if (data.weather[0].main === 'Thunderstorm') {
        container.style.backgroundColor = 'rgb(24, 22, 49)';
    }
    else if (data.weather[0].main === 'Drizzle') {
        container.style.backgroundColor = 'rgb(86, 82, 136)';
    }
    else if (data.weather[0].main === 'Rain') {
        container.style.backgroundColor = 'rgb(55, 48, 150)';
    }
    else if (data.weather[0].main === 'Snow') {
        container.style.backgroundColor = 'rgb(171, 169, 196)';
        container.style.color = 'black';
    }
    else if (data.weather[0].main === 'Mist' || 
            data.weather[0].main === 'Smoke' || 
            data.weather[0].main === 'Haze' || 
            data.weather[0].main === 'Dust' ||
            data.weather[0].main === 'Fog' ||
            data.weather[0].main === 'Sand' ||
            data.weather[0].main === 'Ash' ||
            data.weather[0].main === 'Squall' ||
            data.weather[0].main === 'Tornado') {
                container.style.backgroundColor = 'rgb(135, 134, 153)';
    }
    else if (data.weather[0].main === 'Clear') {
        container.style.backgroundColor = 'rgb(75, 130, 212)';
        container.style.color = 'whie';
    }
    else {
        container.style.backgroundColor = 'white';
        container.style.color = 'black';
    }

}

function showCurrentWeather(current, daily, location) {
    // Change Background Depending on Weather
    const container = document.querySelector('.current-weather');
    changeBg(current, container);
    
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
    icon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    date.textContent = new Date(current.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
    place.textContent = `${location.place.city}, ${location.place.country}`;
    weatherDescription.textContent = capitalizeFirstLetter(current.weather[0].description);
    currentTemp.textContent = `${parseInt(current.temp)}°C`;
    pop.textContent = `${daily[0].pop * 100}%`
    feelsLike.textContent = `${parseInt(current.feels_like)}°C`;
    wind.textContent = `${current.wind_speed}m/s`;
    humidity.textContent = `${current.humidity}%`;
}

function showDailyWeather(days) {
    const container = document.querySelector('.daily-weather-container');
    resetContainer(container);

    for (let i = 1; i < days.length - 1; i++) {
        // Make data easier to access
        const day = days[i];
        
        // Create Containers
        const dailyWeather = document.createElement('div');
        const dateContainer = document.createElement('div');
        const iconContainer = document.createElement('div');
        const bottomContainer = document.createElement('div');
        const detailsContainer = document.createElement('div');
        const windContainer = document.createElement('div');
        const popContainer = document.createElement('div'); 
        const tempContainer = document.createElement('div');

        // Create Elements Inside Containers
        const date = document.createElement('p');
        const icon = document.createElement('img');
        const windIcon = document.createElement('span');
        const popIcon = document.createElement('span');
        const wind = document.createElement('p');
        const pop = document.createElement('p');
        const tempDay = document.createElement('p');

        // Add Class to Elements
        dailyWeather.classList.add('daily-weather');
        dateContainer.classList.add('daily-date-container');
        iconContainer.classList.add('daily-icon-container');
        bottomContainer.classList.add('daily-bottom-container');
        detailsContainer.classList.add('daily-details-container');
        windContainer.classList.add('daily-wind-container');
        popContainer.classList.add('daily-pop-container');
        tempContainer.classList.add('daily-temp-container');
        date.classList.add('daily-date');
        icon.classList.add('daily-icon');
        windIcon.classList.add('material-icons');
        popIcon.classList.add('material-icons');
        tempDay.classList.add('daily-temp-day');
        
        // Add Source Text Content
        date.textContent = new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'long', });
        icon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        windIcon.textContent = 'air'
        popIcon.textContent = 'water_drop';
        wind.textContent = `${day.wind_speed}m/s`;
        pop.textContent = `${day.pop * 100}%`;
        tempDay.textContent = `${parseInt(day.temp.day)}°`;

        // Append Elements to Container
        dailyWeather.appendChild(dateContainer);
        dailyWeather.appendChild(iconContainer);
        dailyWeather.appendChild(bottomContainer);
        dailyWeather.appendChild(windContainer);
        dailyWeather.appendChild(popContainer);
        dailyWeather.appendChild(tempContainer);
        dateContainer.appendChild(date);
        iconContainer.appendChild(icon);
        windContainer.appendChild(windIcon);
        windContainer.appendChild(wind);
        tempContainer.appendChild(tempDay);
        popContainer.appendChild(popIcon);
        popContainer.appendChild(pop);
        detailsContainer.appendChild(windContainer);
        detailsContainer.appendChild(popContainer);
        bottomContainer.appendChild(detailsContainer);
        bottomContainer.appendChild(tempContainer);
        container.appendChild(dailyWeather);

        // Change Background Depending on Weather
        changeBg(day, dailyWeather);
    }
}

async function showWeather() {
    // Get Data from Async Functions
    const location = await getLocation().catch(error => { console.error(error) });
    
    if (!location) {
        alert('Cannot Find Location.');
        resetInput();
        return;
    }

    const data = await getWeather(location).catch(error => { console.error(error) });
    const currentWeather = await getCurrentWeather(data).catch(error => { console.error(error) });
    const dailyWeather = await getDailyWeather(data).catch(error => { console.error(error) });
    
    // Show Organized Weather Data
    showCurrentWeather(currentWeather, dailyWeather, location);
    showDailyWeather(dailyWeather);

    console.log(data);

    resetInput();
}

function renderAll() {
    const form = document.querySelector('.location-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        showWeather().catch(error => { console.error(error); }); 
    });
}

export { renderAll, showWeather }