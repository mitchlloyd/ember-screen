import Ember from 'ember';
import BrowserWindow from 'ember-screen/window/browser';
import NullWindow from 'ember-screen/window/null';

const { computed, get, getOwner } = Ember;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    let WindowClass = this.get('isFastBoot') ? NullWindow : BrowserWindow;
    this.win = new WindowClass();
    this.win.onSizeUpdate(this.handleResize.bind(this));
  },

  willDestroy() {
    this.win.teardown();
  },

  handleResize({ width, height }) {
    this.set('width', width);
    this.set('height', height);
  },

  stubMediaFeatures(features) {
    this.win.stubMediaFeatures(features);
  },

  isFastBoot: computed(function() {
    if (!getOwner) {
      // Ember.getOwner is available as of Ember 2.3, while FastBoot requires 2.4. So just return false...
      return false;
    }

    let owner = getOwner(this);
    if (!owner) {
      return false;
    }

    let fastboot = owner.lookup('service:fastboot');
    if (!fastboot) {
      return false;
    }

    return get(fastboot, 'isFastBoot');
  })
});

