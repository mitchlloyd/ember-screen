/* globals FastBoot */
import Service from '@ember/service';
import BrowserWindow from 'ember-screen/window/browser';
import NullWindow from 'ember-screen/window/null';
import { tracked } from '@glimmer/tracking';

const isFastBoot = typeof FastBoot !== 'undefined';
const WindowClass = isFastBoot ? NullWindow : BrowserWindow;

export default class ScreenService extends Service {
  @tracked width;
  @tracked height;

  constructor() {
    super(...arguments);
    this.win = new WindowClass();
    this.win.onSizeUpdate(this.handleResize.bind(this));
  }

  willDestroy() {
    this.win.teardown();
  }

  handleResize({ width, height }) {
    this.width = width;
    this.height = height;
  }

  stubMediaFeatures(features) {
    this.win.stubMediaFeatures(features);
  }
}
