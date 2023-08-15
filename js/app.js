'use strict';

import { fetchData, url } from './api.js';
import * as module from './module.js';

/**
 * @param {NodeList} elements 
 * @param {string} eventType 
 * @param {Function} callback 
 */
const addEventOnElements = function(elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
}

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle('active');
addEventOnElements(searchTogglers, 'click', toggleSearch);

/**
 * Search Integration
 */
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener('input', function() {
  searchTimeout ?? clearTimeout(searchTimeout);
  if (!searchField.value) {
    searchResult.classList.remove('active');
    searchResult.innerHTML = '';
    searchField.classList.remove('searching');
  } else {
    searchField.classList.add('searching');
  }

  if (searchField.value) {
    searchTimeout = setTimeout(() => {
      fetchData(url.geo(searchField.value), function(locations) {
        searchField.classList.remove('searching');
        searchResult.classList.add('active');
        searchResult.innerHTML = `
          <ul class="view-list" data-search-list></ul>
        `;

        const /** {NodeList} | [] */ items = [];

        for (const { name, lat, lon, country, state } of locations) {
          const searchItem = document.createElement("li");
          searchItem.classList.add('view-item');

          searchItem.innerHTML = `
            <span class="m-icon">location_on</span>
            
            <div>
              <p class="item-title">${name}</p>
              <p class="label-2 item-subtitle">${state || ''} ${country}</p>
            </div>

            <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather " data-search-toggler></a>
          `;

          searchResult.querySelector("[data-search-list]").appendChild(searchItem);
          items.push(searchItem.querySelector("[data-search-toggler]"))
        }

        addEventOnElements(items, 'click', function() {
          toggleSearch();
          searchResult.classList.remove('active');
        });
      }); 
    }, searchTimeoutDuration);
  }
});

const container = document.querySelector('[data-container]');
const loading = document.querySelector('[data-loading]');
const currentLocationBtn = document.querySelector('[data-current-location-btn]');
const errorContent = document.querySelector('[data-error-content]');

/**
 * 
 * @param {number} lat 
 * @param {number} lon 
 */
export const updateWeather = function(lat, lon) {
  // loading.style.display = 'grid';
  // container.style.overflowY = 'hidden';
  // container.classList.remove('fade-in');
  // errorContent.style.display = 'none';

  const currentWeatherSection = document.querySelector('[data-current-weather]');
  const highlightSection = document.querySelector('[data-highlights]');
  const hourlySection = document.querySelector('[data-hourly-forecast]');
  const forecastSection = document.querySelector('[data-5-day-forecast]');

  currentWeatherSection.innerHTML = "";
  highlightSection.innerHTML = "";
  hourlySection.innerHTML = "";
  forecastSection.innerHTML = "";

  /* if (window.location.hash === '#/current-location') {
    currentLocationBtn.setAttribute('disabled', '');
  } else {
    currentLocationBtn.removeAttribute('disabled');
  } */

  fetchData(url.currentWeather(lat, lon), function(currentWeather) {
    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: {temp, feels_like, humidity },
      visibility,
      timezone
    } = currentWeather
    const [{ description, icon }] = weather;

    const card = document.createElement('div');
    card.classList.add('card', 'card-lg', 'current-weather-card');

    card.innerHTML = `
      <h2 class="title-2 card-title">Now</h2>

      <div class="wrapper">
        <p class="heading">${parseInt(temp)}&deg;<sup>C</sup></p>

        <img src="/assets/images/weather_icons/${icon}.png" width="80" height="80" alt="${description}" class="weather-icon">
      </div>

      <p class="body-3">${description}</p>

      <ul class="meta-list">
          <li class="meta-item">
            <span class="m-icon">calendar_today</span>
            <p class="title-3 meta-text">${module.getDate(dateUnix, timezone)}</p>
          </li>
          <li class="meta-item">
            <span class="m-icon">location_on</span>
            <p class="title-3 meta-text" data-location></p>
          </li>
      </ul>
    `;

    fetchData(url.reverseGeo(lat, lon), function([{ name, country }]) {
      card.querySelector(['[data-location]']).innerHTML = `${name}, ${country}`
    });

    currentWeatherSection.appendChild(card);

    fetchData(url.airPollution(lat, lon), function(airPollution) {
      const card = document.createElement('div');
      card.classList.add('weather-details');

      card.innerHTML = `
        <h2 class="title-2">Additional Info</h2>    
        <div class="row-2">
          <div class="small-container">
            <p class="title-3 small-container-title">Visibility</p>
            <div class="bottom-container">
              <span class="m-icon m-icon-weather">visibility</span>
              <p>${visibility / 1000} km/h</p>
            </div>
          </div>
          <div class="border"></div>
          <div class="small-container">
            <p class="title-3 small-container-title">Humidity</p>
            <div class="bottom-container">
              <span class="m-icon m-icon-weather">airwave</span>
              <p>${humidity}%</p>
            </div>
          </div>
          <div class="border"></div>
          <div class="small-container">
            <p class="title-3 small-container-title">Feels Like</p>
            <div class="bottom-container">
              <span class="m-icon m-icon-weather">thermostat</span>
              <p>${parseInt(feels_like)}&deg;C</p>
            </div>
          </div>
          <div class="border"></div>
          <span class="m-icon sunrise">clear_day</span>
          <div class="sunrise-container" style="margin-right: 20px">
            <p class="title-Sun">Sunrise</p>
            <p class="title-Sun">${module.getTime(sunriseUnixUTC, timezone)}</p>
          </div>
          <span class="m-icon sunset">clear_night</span>
          <div class="sunset-container">
            <p class="title-Sun">Sunset</p>
            <p class="title-Sun">${module.getTime(sunsetUnixUTC, timezone)}</p>
          </div>  
        </div>
      `

      highlightSection.appendChild(card);
    });

    fetchData(url.forecast(lat, lon), function(forecast) {
      const {
        list: forecastList,
        city: { timezone },
      } = forecast

      const weatherDetailsContainer = document.createElement('div');
      weatherDetailsContainer.classList.add('weather-details');
      
      const header = document.createElement('h2');
      header.classList.add('title-2');
      header.textContent = 'Today At';
      weatherDetailsContainer.appendChild(header);

      const weatherDetailsInfo = document.createElement('div');
      weatherDetailsInfo.classList.add('weather-details-info');

      weatherDetailsContainer.appendChild(weatherDetailsInfo);

      hourlySection.appendChild(weatherDetailsContainer);

      for (const [index, data] of forecastList.entries()) {
        if (index > 7) break;
        
        const { 
          dt: dateTimeUnix, 
          main: { temp }, 
          weather,
          wind: { deg: windDirection, speed: windSpeed } 
        } = data;
        const [{ icon, description }] = weather;

        const tempLi = document.createElement('div');
        tempLi.classList.add('row');

        tempLi.innerHTML = `
          <div style="width: 170px; display: flex; align-items: center; justify-content: center">
            <p class="time">${module.getHours(dateTimeUnix, timezone)}</p>
            <img class="row-image" src="/assets/images/weather_icons/${icon}.png" width="60" height="60" alt="${description}" title="${description}">
            <p class="weather-details-degree">${parseInt(temp)}&deg;</p>
          </div>
          <div class="border"></div>
          <img src="/assets/images/weather_icons/direction.png" style="transform: rotate(${windDirection - 180}deg)">
          <p class="weather-details-speed">${parseInt(module.mps_to_kmh(windSpeed))} km/h</p>
        `;

        weatherDetailsInfo.appendChild(tempLi);
      }

      forecastSection.innerHTML = `
        <div class="card card-lg forecast-card">
          <h2 style="margin-bottom: 8px;" class="title-2" id="forecast label">5 days forecast</h2>    
          <ul data-forecast-list></ul>
        </div>
      `;

      for (let i = 7, len = forecastList.length; i < len; i+=8) {
        const {
          main: { temp_max },
          weather,
          dt_txt
        } = forecastList[i];
        const [{ icon, description }] = weather;
        const date = new Date(dt_txt);
        const li = document.createElement('li');
        li.classList.add('card-item')

        li.innerHTML = `
          <div class="icon-wrapper">
            <img src="/assets/images/weather_icons/${icon}.png" width="36" height="36" alt="${description}" class="weather-icon" alt="${description}">

            <span class="span">
              <p class="title-2">${parseInt(temp_max)}&deg;</p>
            </span>
          </div>

          <p class="label-1">${date.getDate()} ${module.monthNames[date.getUTCMonth()]}</p>

          <p class="label-1">${module.weekDayNames[date.getUTCDay()]}</p>
        `;
        forecastSection.querySelector('[data-forecast-list]').appendChild(li)
      }

      // loading.style.display = 'none';
      // container.style.overflowY = 'overlay';
      // container.classList.add('fade-in');
    });
  });
}

export const error404 = () => errorContent.style.display = 'flex';