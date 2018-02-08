# Ember Screen

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

<<<<<<< HEAD
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

## Testing Media Queries

Creating automated tests for different screen sizes is often neglected because
it is not practical to programmatically resize a web browser during tests. Ember
Screen lets you to stub [media features](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features)
to run tests that are integrated with your screen service logic.

```javascript
// An example acceptance test

test('shows large logo on HD tv', function(assert) {
  let screen = this.application.__container__.lookup('service:screen');
  screen.stubMediaFeatures({ type: 'tv', width: 1920 });

  visit('/');

  andThen(function() {
    assert.equal(find('.logo-large').length, 1, "HD TVs have large logo");
  });
});
```

This feature uses [css-mediaquery](https://github.com/ericf/css-mediaquery) to
parse your configured `breakpoints` and see if they match with the stubbed
values.

## Running in FastBoot
=======
* `git clone <repository-url>` this repository
* `cd my-addon`
* `npm install`
>>>>>>> 0c7bc4a... message

Ember screen is compatible with [FastBoot](https://ember-fastboot.com) out
of the box. However in a FastBoot environment running on a server there is
no way to access the screen properties of the client. If your UI depends on
the device's screen size then you can use the screen service's
`stubMediaFeatures` method to provide defaults. See this [simple
example](fastboot-tests/fixtures/fastboot/app/instance-initializers/fastboot/stub-media.js)
of a FastBoot-only instance initializer.

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

