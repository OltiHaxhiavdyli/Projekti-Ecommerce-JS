'use strict';

export const weekDayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

/**
 * @param {number} dateUnix 
 * @param {number} timezone 
 * @returns {string} 
 */
export const getDate = function(dateUnix, timezone) {
  const date = new Date((dateUnix + timezone) * 1000);
  const weekDayName = weekDayNames[date.getUTCDay()];
  const monthName = monthNames[date.getUTCMonth()];

  return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;
}

/**
 * 
 * @param {number} timeUnix 
 * @param {number} timezone 
 * @returns {string}
 */
export const getTime = function(timeUnix, timezone) {
  const date = new Date((timeUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * 
 * @param {number} timeUnix 
 * @param {number} timezone 
 * @returns {string}
 */
export const getHours = function(timeUnix, timezone) {
  const date = new Date((timeUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const period = hours >= 12 ? 'PM' : 'AM';

  return `${hours % 12 || 12} ${period}`;
}

/**
 * 
 * @param {number} mps 
 * @returns {number}
 */
export const mps_to_kmh = mps => {
  const mph = mps * 3600;
  return mph / 1000;
}