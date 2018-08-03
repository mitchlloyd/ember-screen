/* globals FastBoot */
import Service from '@ember/service';
import BrowserWindow from 'ember-screen/window/browser';
import NullWindow from 'ember-screen/window/null';

const isFastBoot = typeof FastBoot !== 'undefined';
const WindowClass = isFastBoot ?  NullWindow : BrowserWindow;

export default Service.extend({
  init() {
    this._super(...arguments);
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
  }
});
