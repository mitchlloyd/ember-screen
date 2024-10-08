# Ember Screen

[ ![Codeship Status for mitchlloyd/ember-screen](https://codeship.com/projects/efc09170-87ef-0133-2329-32f8e6acffcd/status?branch=master)](https://codeship.com/projects/123088)

This addon adds a `screen` service to your Ember application that will report
the current height and width of the window.

```javascript
import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ExampleComponent extends Component {
  @service screen;

  get showTopNavigation() {
    return this.screen.width > 1_000;
  }
}
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

export default class ScreenService extends EmberScreen {
  @breakpoint('(min-width: 34em)') isSmallAndUp;
  @breakpoint('(min-width: 48em)') isMediumAndUp;
  @breakpoint('(min-width: 62em)') isLargeAndUp;
  @breakpoint('(min-width: 75em)') isExtraLargeAndUp;

  @breakpoint('(max-width: 33.9999em)') isExtraSmallAndDown;
  @breakpoint('(max-width: 47.9999em)') isSmallAndDown;
  @breakpoint('(max-width: 61.9999em)') isMediumAndDown;
  @breakpoint('(max-width: 74.9999em') isLargeAndDown;
}
```

If you inject `screen` into a component, you could use a media query property
like this:

```handlebars
{{#if this.screen.isSmallAndDown}}
  ☰ <!-- obligatory hamburger -->
{{/if}}
```

To configure your own media queries, create an `app/services/screen.js` file
in your application and extend from the Ember Screen service.

```javascript
import EmberScreen, { breakpoint } from 'ember-screen';

export default class ScreenService extends EmberScreen {
  @breakpoint('(max-width: 479px)') isMobile;
  @breakpoint('(min-width: 480px)') isDesktop;
}
```

## Testing Media Queries

Creating automated tests for different screen sizes is often neglected because
it is not practical to programmatically resize a web browser during tests. Ember
Screen lets you to stub [media features](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features)
to run tests that are integrated with your screen service logic.

```javascript
// An example acceptance test

test('shows large logo on HD tv', async function(assert) {
  let screen = this.owner.lookup('service:screen');
  screen.stubMediaFeatures({ type: 'tv', width: 1920 });

  await visit('/');

  assert.dom('.logo-large').exists('HD TVs have large logo');
});
```

This feature uses [css-mediaquery](https://github.com/ericf/css-mediaquery) to
parse your configured `breakpoints` and see if they match with the stubbed
values.

## Running in FastBoot

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

