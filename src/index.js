/**
 * @fileOverview Library Bootstrap.
 */

var Calendarth = require('./calendarth');

/**
 * The exported API, return a new instance of Calendarth.
 *
 * @param {Object} options Options.
 * @return {Calendarth} A new instance of Calendarth.
 */
module.exports = function(options) {
  return new Calendarth(options);
};
