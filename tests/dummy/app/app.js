import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dummy/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  constructor(...args) {
    super(...args);

    // Make the application available so that we can call .visit('/') on it in a
    // popup.
    window.DummyApplication = this;
  }
}

loadInitializers(App, config.modulePrefix);
