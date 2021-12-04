import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dummy/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  init() {
    // Let the tests override the autoboot config by passing a query param. This
    // will allow us to test the running dummy app inside of a popup window.
    if (location.search.includes('inTestPopup')) {
      this.autoboot = true;
    }

    this._super(...arguments);
  }
}

loadInitializers(App, config.modulePrefix);
