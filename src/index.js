import key from "../config";

const APIKEY = key;

const form = document.querySelector('.location-form');
const input = document.getElementById('location');

form.addEventListener('submit', e => {
    e.preventDefault();
    showWeather().catch(error => {
        console.error(error);
    });
})

async function fetchData() {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${input.value}`, {mode: 'cors'});
    return response.json();
}

function getWeather(data) {
    const weather = {
        location: {
            city: data.location.region,
            country: data.location.country
        },
        temperature: {
            tempC: data.current.temp_c,
            feelsLikeC: data.current.feelslike_c,
            tempF: data.current.temp_f,
            feelsLikeF: data.current.feelslike_f
        },
        wind: {
            windMPH: data.current.wind_mph,
            windKPH: data.current.wind_kph
        },
        condition: {
            text: data.current.condition.text,
            icon: data.current.condition.icon
        },
        humidity: data.current.humidity,
    }
    return weather;
}

async function showWeather() {
    const data = await fetchData().catch(error => {
        console.error(error);
    });
    if (data.error) return;
    console.log(data);
    console.log(getWeather(data));
    changeInput();
}

function changeInput() {
    input.placeholder = input.value;
    input.value = null;
}
