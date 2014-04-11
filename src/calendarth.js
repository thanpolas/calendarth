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

var Item = require('./item');

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
Calendarth.prototype.getEventUrl = function(eventItem) {
  var linkParts = eventItem.htmlLink.split('=');
  var out = 'http://www.google.com/calendar/event?action=TEMPLATE&tmeid=';
  out += linkParts[1];
  out += '&tmsrc=';
  out += encodeURIComponent(eventItem.organizer.email);
  return out;
};
