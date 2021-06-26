import { getLocation ,getWeather, getCurrentWeather, getDailyWeather } from './api-functionalities';

const form = document.querySelector('.location-form');
const input = document.getElementById('query-location');

// TODOS
// function showCurrentWeather() {

// }

// function showDailyWeather() {

// }

async function showWeather() {
    const location = await getLocation();
    const data = await getWeather(location).catch(error => {
        console.error(error);
    });
    if (data.error) return;
    const currentWeather = getCurrentWeather(data);
    const dailyWeather = getDailyWeather(data);
    console.log('location:', location);
    console.log('Current Weather:',currentWeather);
    console.log('Daily Weather:' ,dailyWeather);
}

function renderAll() {
    form.addEventListener('submit', e => {
        e.preventDefault();
        showWeather().catch(error => {
            console.error(error);
        });
        resetInput();    
    });
}

function resetInput() {
    input.placeholder = input.value;
    input.value = null;
}

export default renderAll