'use strict';

import { updateWeather, error404 } from './app.js';

const defaultLocation = '#/weather?lat=42.3844&lon=20.4285';

const currentLocation = function() {
  window.navigator.geolocation.getCurrentPosition(res => {
    const { latitude, longitude } = res.coords;
    updateWeather(`lat=${latitude}`, `lon=${longitude}`)
  }, err => {
    window.location.hash = defaultLocation;
  });
}

/**
 * 
 * @param {string} query 
 */
const searchedLocation = query => updateWeather(...query.split('&')) ;
// 'lat=42.6591&lon=20.2883'
// updateWeather('lat=42.6591', 'lon=20.2883')

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation]
]);

const checkHash = function() {
  const requestURl = window.location.hash.slice(1);

  const [route, query] = requestURl.includes ? requestURl.split("?") : [requestURl];

  routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener('hashchange', checkHash);

window.addEventListener('load', function() {
  if (!window.location.hash) {
    window.location.hash = '#/current-location';
  } else {
    checkHash();
  }
});