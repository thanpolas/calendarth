# Calendarth

## Fetch a Public Google Calendar with AJAX

A helper library that fetches and parses a public Google Calendar using the [Google API v3][google api v3].

> This package requires jQuery to exist in the global namespace as `$`, hopefully future versions will decouple this dependency, pull requests welcome.

[google api v3]: https://developers.google.com/google-apps/calendar/v3/reference/events/list "Google Calendar API v3"

## Install

```shell
bower install calendarth --save
```

## Documentation

You can access Calendarth using the globally available variable `calendarth` or as a browserify module. Here's how you can get a new Calendarth instance by invoking the global:

```js
var calendarth = window.calendarth({
  calendarId: 'xxx',
  appId: 'xxx',
});
```

> Look into the `build/` folder for available modular and global exposing builds.

### Calendarth Options

When initializing a new Calendarth Object you may pass the following options:

* `calendarId` **Type**: `string` **required** The Calendar's Id, looks like this: `djasldj23ljd23dj23ldj2%40group.calendar.google.com`
* `appId` **Type**: `string` **required** The Google API app id.
* `maxResults` **Type**: `number` *Default*: 20 Maximum results to fetch.

### Calendarth Methods

#### calendarth.fetch(cb)

Fetches the entries of the calendar. Accepts a node style callback:

```js
var cal = calendarth();

cal.fetch(function(err, calendarObj) {
  err === null; // true
  typeof calendarObj === 'object'; // true
});
```

The returned Object is the raw Data Object as passed from the Google Calendar Api v3, you can [view a beautified object in this wiki page](https://github.com/thanpolas/calendarth/wiki/Google_Calendar_Object_v3).

#### calendarth.getEventLink(eventItem)

Will return a url that can be used to add the event to a user's Google Calendar.

```js
cal.fetch(function(err, calendarObj) {
  err === null; // true

  // get the first event item
  var eventItem = calendarObj.item.shift();

  var addEventToCal = cal.getEventLink(eventItem);
  console.log(addEventToCal);
});
```

## Release History

- **v0.0.5**, *12 Apr 2014*
    - Add getEventLink() feature.
- **v0.0.3**, *9 Apr 2014*
    - Published to NPM.
    - Now exposes a modular build too.
- **v0.0.1**, *8 Apr 2014*
    - Big Bang

## License

Copyright 2013 [Thanasis Polychronakis][thanpolas]

Licensed under the [MIT License](LICENSE-MIT)

[thanpolas]: https://github.com/thanpolas "Thanasis Polychronakis"
