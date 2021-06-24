const APIKEY = '8630a15e4ffb404cbbd110931212406';

const form = document.querySelector('.location-form');
const input = document.getElementById('location');

form.addEventListener('submit', e => {
    e.preventDefault();
    renderAll();
})

async function fetchData() {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${input.value}`, {mode: 'cors'});
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

