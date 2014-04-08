/**
 * @fileOverview Usage tests, requires a calendarID and an API key.
 */
module('Usage Tests');

var calendarId = '';
var apiKey = '';

asyncTest('API returns expected results', function() {
  expect(2);
  var calendarth = window.calendarth({
    calendarId: calendarId,
    apiKey: apiKey,
  });

  calendarth.fetch(function(err, item) {
    ok(err === null, '"err" should be "null"');
    ok(typeof item === 'object', '"item" should be an Object');
    start();
  });
});
