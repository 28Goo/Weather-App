(()=>{"use strict";const e="1c4ba7510ca2bc5d02a76e9bc4006794",t=document.getElementById("query-location");function n(){document.getElementById("query-location").value=null}async function a(){const a=await async function(){const n=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t.value}&appid=${e}`,{mode:"cors"}),a=await n.json();return{coords:{lat:a.coord.lat,lon:a.coord.lon},place:{city:a.name,country:a.sys.country}}}().catch((e=>{console.error(e)}));if(!a)return alert("Cannot Find Location."),void n();const o=await async function(t){return(await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${t.coords.lat}&lon=${t.coords.lon}&exclude=minutely&units=metric&appid=${e}`,{mode:"cors"})).json()}(a).catch((e=>{console.error(e)})),c=await async function(e){return e.current}(o).catch((e=>{console.error(e)})),r=await async function(e){return e.daily}(o).catch((e=>{console.error(e)}));(function(e,t,n){var a;"Thunderstorm"===(a=e).weather[0].main?console.log("Thunderstorm"):"Drizzle"===a.weather[0].main?console.log("Drizzle"):"Rain"===a.weather[0].main?console.log("Rain"):"Snow"===a.weather[0].main?console.log("Snow"):"Mist"===a.weather[0].main||"Smoke"===a.weather[0].main||"Haze"===a.weather[0].main||"Dust"===a.weather[0].main||"Fog"===a.weather[0].main||"Sand"===a.weather[0].main||"Ash"===a.weather[0].main||"Squall"===a.weather[0].main||"Tornado"===a.weather[0].main?console.log("Atmosphere"):"Clear"===a.weather[0].main?console.log("Clear"):console.log("Clouds");const o=document.querySelector(".current-icon"),c=document.querySelector(".current-date"),r=document.querySelector(".current-location"),d=document.querySelector(".current-weather-description"),i=document.querySelector(".current-temp"),l=document.querySelector(".current-pop"),s=document.querySelector(".current-feels-like"),p=document.querySelector(".current-wind"),m=document.querySelector(".current-humidity");o.src=`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`,c.textContent=new Date(1e3*e.dt).toLocaleDateString("en",{weekday:"long"}),r.textContent=`${n.place.city}, ${n.place.country}`,d.textContent=function(e){let t=e.split(" ");for(let e=0;e<t.length;e++)t[e]=t[e][0].toUpperCase()+t[e].substr(1);return t.join(" ")}(e.weather[0].description),i.textContent=`${parseInt(e.temp)}°C`,l.textContent=100*t[0].pop+"%",s.textContent=`${parseInt(e.feels_like)}°C`,p.textContent=`${e.wind_speed}m/s`,m.textContent=`${e.humidity}%`})(c,r,a),function(e){const t=document.querySelector(".daily-weather-container");!function(e){e.innerHTML=null}(t);for(let n=1;n<e.length-1;n++){const a=e[n],o=document.createElement("div"),c=document.createElement("div"),r=document.createElement("div"),d=document.createElement("div"),i=document.createElement("div"),l=document.createElement("div"),s=document.createElement("div"),p=document.createElement("div"),m=document.createElement("p"),u=document.createElement("img"),h=document.createElement("span"),y=document.createElement("span"),w=document.createElement("p"),C=document.createElement("p"),g=document.createElement("p");o.classList.add("daily-weather"),c.classList.add("daily-date-container"),r.classList.add("daily-icon-container"),d.classList.add("daily-bottom-container"),i.classList.add("daily-details-container"),l.classList.add("daily-wind-container"),s.classList.add("daily-pop-container"),p.classList.add("daily-temp-container"),m.classList.add("daily-date"),u.classList.add("daily-icon"),h.classList.add("material-icons"),y.classList.add("material-icons"),g.classList.add("daily-temp-day"),m.textContent=new Date(1e3*a.dt).toLocaleDateString("en",{weekday:"long"}),u.src=`https://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png`,h.textContent="air",y.textContent="water_drop",w.textContent=`${a.wind_speed}m/s`,C.textContent=100*a.pop+"%",g.textContent=`${parseInt(a.temp.day)}°`,o.appendChild(c),o.appendChild(r),o.appendChild(d),o.appendChild(l),o.appendChild(s),o.appendChild(p),c.appendChild(m),r.appendChild(u),l.appendChild(h),l.appendChild(w),p.appendChild(g),s.appendChild(y),s.appendChild(C),i.appendChild(l),i.appendChild(s),d.appendChild(i),d.appendChild(p),t.appendChild(o)}}(r),console.log(o),n()}t.value="Manila",document.addEventListener("DOMContentLoaded",(()=>{a().catch((e=>{console.error(e)})),document.querySelector(".location-form").addEventListener("submit",(e=>{e.preventDefault(),a().catch((e=>{console.error(e)}))}))}))})();