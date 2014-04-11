!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.calendarth=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*
 * Calendarth
 * Fetch a Public Google Calendar with AJAX
 * https://github.com/thanpolas/calendarth
 *
 * Copyright (c) 2014 Thanasis Polychronakis
 * Licensed under the MIT license.
 */
/**
 * @fileOverview Google Calendar client, fetches and parses calendar items.
 */

var Item = _dereq_('./item');

/**
 * The base class.
 *
 * @param {Object} options A dict with options to configure the Calendarth:
 *    @param {string} calendarId REQUIRED the calendar Id, looks like:
 *        djasldj23ljd23dj23ldj2%40group.calendar.google.com
 *    @param {string} apiKey A google API v3 key.
 * @constructor
 */
var Calendarth = module.exports = function(options) {
  this.options = options || {};
  this.apiKey = this.options.apiKey || null;
  this.calendarId = this.options.calendarId || null;
  this.maxResults = this.options.maxResults || 20;
};

/**
 * Fetch Calendar items.
 *
 * @param {Function(Error, Array.<Calendarth.Item>)} cb Node style callback.
 * @see https://github.com/thanpolas/calendarth/wiki/Google_Calendar_Object_v3
 */
Calendarth.prototype.fetch = function(cb) {
  var calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/';
  calendarUrl += this.calendarId + '/events?key=';
  calendarUrl += this.apiKey;

  var dt = new Date();
  calendarUrl += '&orderBy=startTime';
  calendarUrl += '&singleEvents=true';
  calendarUrl += '&timeMin=' + dt.toISOString();
  calendarUrl += '&maxResults=' + this.maxResults;
  $.ajax({
    type: 'GET',
    url: calendarUrl,
    crossDomain: true,
    dataType: 'json'
  }).done(function(data) {
    var item = new Item(data);
    cb(null, item);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    cb(errorThrown);
  });
};

/**
 * Return a url that will perform the "Add Event to Google Calendar" action.
 *
 * @param {Object} eventItem The event data object.
 * @return {string} The event link to use in the anchor element.
 */
Calendarth.prototype.getEventLink = function(eventItem) {
  var out = 'http://www.google.com/calendar/event?action=TEMPLATE&text=';
  out += encodeURIComponent(eventItem.summary);
  out += '&dates=';
  out += encodeURIComponent(eventItem.start.dateTime ?
    eventItem.start.dateTime : eventItem.start.date);
  out += '/';
  out += encodeURIComponent(eventItem.end.dateTime ?
    eventItem.end.dateTime : eventItem.end.date);
  out += '&details=';
  out += encodeURIComponent(eventItem.description);
  out += '&location=';
  out += encodeURIComponent(eventItem.location);
  out += '&trp=false&sprop=name:';
};

},{"./item":3}],2:[function(_dereq_,module,exports){
/**
 * @fileOverview Library Bootstrap.
 */

var Calendarth = _dereq_('./calendarth');

/**
 * The exported API, return a new instance of Calendarth.
 *
 * @param {Object} options Options.
 * @return {Calendarth} A new instance of Calendarth.
 */
module.exports = function(options) {
  return new Calendarth(options);
};

},{"./calendarth":1}],3:[function(_dereq_,module,exports){
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
  // stub return with same object for now...
  return calendarObj;
  // this.calendarObj = calendarObj;
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

},{}]},{},[2])
(2)
});;