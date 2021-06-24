import key from "./config";

const myKey = key;

const form = document.querySelector('.location-form');
const input = document.getElementById('location');

form.addEventListener('submit', e => {
    e.preventDefault();
    renderAll();
})

async function fetchData() {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${myKey}&q=${input.value}`, {mode: 'cors'});
    return response.json();
}

function getData(data) {
    const weather = {
        place: {
            city: data.location.region,
            country: data.location.country
        },
        temperature: {
            temp: data.current.temp_c,
            feelsLike: data.current.feelslike_c
        }
    }
    return weather;
}

async function renderAll() {
    const data = await fetchData().catch(error => {
        console.error(error);
    });
    if (data.error) return;
    console.log(data);
    console.log(getData(data));
    input.value = null;
}

// ERROR HANDLING

