import { fetchData, getLocation, getCurrentWeather, getDailyWeather } from './api-functionalities';

const form = document.querySelector('.location-form');
const input = document.getElementById('query-location');

function submitInput() {
    form.addEventListener('submit', e => {
        e.preventDefault();
        showWeather().catch(error => {
            console.error(error);
        });
        resetInput();
    });
}

async function showWeather() {
    const location = await getLocation().catch(error => {
        console.error(error);
    });
    const data = await fetchData(location).catch(error => {
        console.error(error);
    });
    if (location.error || data.error) return;
    const currentWeather = getCurrentWeather(data);
    const dailyWeather = getDailyWeather(data);
    console.log(currentWeather);
    console.log(dailyWeather);
    console.log(location.place);
}

function resetInput() {
    input.placeholder = input.value;
    input.value = null;
}

export default submitInput