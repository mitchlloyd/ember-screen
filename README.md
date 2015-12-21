# Ember-screen

This addon adds a `screen` service to your Ember application that will report
the current height and width of the window.

```
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

```
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

To configure your own media queries, create a `app/services/screen.js` file
in your application and extend from the Ember Screen service.

```
import EmberScreen, { breakpoint } from 'ember-screen';

export default EmberScreen.extend({
  isMobile: breakpoint('(max-width: 640px)'),
  isDesktop: breakpoint('(min-width: 641px)')
});
```

