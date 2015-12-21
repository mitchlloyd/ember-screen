# Ember-screen

[ ![Codeship Status for mitchlloyd/ember-screen](https://codeship.com/projects/efc09170-87ef-0133-2329-32f8e6acffcd/status?branch=master)](https://codeship.com/projects/123088)

This addon adds a `screen` service to your Ember application that will report
the current height and width of the window.

```javascript
import Ember from 'ember';
const { Component, computed, inject } = Ember;

export default Ember.Component({
  screen: inject.service(),

  showTopNavigation: computed('screen.width', function() {
    return this.get('screen.width') > 1000;
  })
})
```

## Installation

```
ember install ember-screen
```

## Using Media Queries

Ember Screen is configured with a set of properties that correspond to
[Bootstrap 4's media queries](http://v4-alpha.getbootstrap.com/layout/overview/#responsive-breakpoints).
This is the default implementation of `app/services/screen.js`.

```javascript
import EmberScreen, { breakpoint } from 'ember-screen';

export default EmberScreen.extend({
  isSmallAndUp: breakpoint('(min-width: 34em)'),
  isMediumAndUp: breakpoint('(min-width: 48em)'),
  isLargeAndUp: breakpoint('(min-width: 62em)'),
  isExtraLargeAndUp: breakpoint('(min-width: 75em)'),

  isExtraSmallAndDown: breakpoint('(max-width: 33.9999em)'),
  isSmallAndDown: breakpoint('(max-width: 47.9999em)'),
  isMediumAndDown: breakpoint('(max-width: 61.9999em)'),
  isLargeAndDown: breakpoint('(max-width: 74.9999em)')
});
```

If you inject `screen` into a component, you could use a media query property
like this:

```handlebars
{{#if screen.isSmallAndDown}}
  ☰ <!-- obligatory hamburger -->
{{/if}}
```

To configure your own media queries, create an `app/services/screen.js` file
in your application and extend from the Ember Screen service.

```javascript
import EmberScreen, { breakpoint } from 'ember-screen';

export default EmberScreen.extend({
  isMobile: breakpoint('(max-width: 479px)'),
  isDesktop: breakpoint('(min-width: 480px)')
});
```

## Running the Tests for this Addon

Running tests that resize a web browser is challenging because web browsers
disable `window.resizeTo` and `window.resizeBy` APIs. Chrome will allow these
methods to work for popup windows that have been programatically created with
`window.open`. The current test suite has some finicky configuration will only
succeed when running with Testem, so the proper way to run tests locally is to
use:

```
ember test
```

or

```
ember test --server
```

