'use strict'

const apiKey = 'c92f75e414c3da6bfe9befb62e941ef3';

/**
 * @param {string} URL Api url
 * @param {Function} callback callback 
 */
export const fetchData = function(URL, callback) {
  fetch(`${URL}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => callback(data))
}

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
  },
  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  },
  airPollution(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  },
  reverseGeo(lat, lon) {
    return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
  },
  /**
   * @param {string} query
   */
  geo(query) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  } 
}