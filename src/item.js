/**
 * @fileOverview A wrapper that provides helpers on the calendar object.
 */

/**
 * A wrapper for the Google Calendar v3 Object.
 * 
 * @param {Object} calendarObj The Google Calendar v3 Object.
 * @constructor
 */
var Item = module.exports = function(calendarObj) {
  this.calendarObj = calendarObj;
};

/**
 * Get a property or the whole calendar object.
 * @param {string=} optProp optionally define a property.
 * @return {Object|*} The Object or whatever type the property value is.
 */
Item.prototype.get = function(optProp) {
  if (optProp) {
    return this.calendarObj[optProp];
  } else {
    return this.calendarObj;
  }
};
