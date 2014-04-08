/**
 * @fileOverview Surface tests
 */
module('Surface Tests');

test('The API is properly exposed', function() {
  expect(2);
  ok(!!window.calendarth, 'API is properly exposed');
  ok(typeof window.calendarth === 'function', 'API export is a function');
});

test('API Exports proper methods and properties', function() {
  expect(1);
  var calendarth = window.calendarth();
  ok(typeof calendarth.fetch === 'function', 'fetch() is a function');
});

