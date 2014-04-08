/**
 * @fileOverview Usage tests, requires a calendarID and an API key.
 */
module('Usage Tests');

var calendarId = '';
var apiKey = '';

asyncTest('API returns expected results', function() {
  expect(3);
  var calendarth = window.calendarth({
    calendarId: calendarId,
    apiKey: apiKey,
  });

  calendarth.fetch(function(err, item) {
    var items = item.get('items');
    for (var i = 0, len = items.length; i < len; i++) {
      console.log('item:', items[i].start.dateTime);
    }
    ok(err === null, '"err" should be "null"');
    ok(typeof item === 'object', '"item" should be an Object');
    ok(item && typeof item.get === 'function', '"item.get()" should be a function');
    start();
  });
});
