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
 * @constructor
 */
var Calendarth = module.exports = function(apiKey, calendarId) {
  this.apiKey = apiKey;
  this.calendarId = calendarId;
};

/**
 * Fetch Calendar items.
 *
 * @param {Function(Error, Array.<Calendarth.Item>)} cb Node style callback.
 */
Calendarth.prototype.fetch = function(cb) {
  var calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/';
  calendarUrl += this.calendarId + '/events?key=';
  calendarUrl += this.apiKey;

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
