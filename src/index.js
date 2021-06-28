import { renderAll, showWeather } from "./Modules/user-interface";

document.addEventListener('DOMContentLoaded', () => {
    showWeather().catch(error => {console.error(error)});
    renderAll();
} );