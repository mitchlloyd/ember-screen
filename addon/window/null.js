import { matchQuery } from 'css-mediaquery';

export default class {
  constructor() {
    this.listeners = [];
    this.resizeListener = this._windowDidResize.bind(this);
    this.stubbedMediaFeatures = false;
  }

  onSizeUpdate(listener) {
    // Immediately call the listener to set initial size
    listener(this.dimensions);

    this.listeners.push(listener);
  }

  get dimensions() {
    if (this.stubbedMediaFeatures) {
      return {
        width: this.stubbedMediaFeatures.width,
        height: this.stubbedMediaFeatures.height
      };
    } else {
      return {
      };
    }
  }

  stubMediaFeatures(features) {
    this.stubbedMediaFeatures = features;
    this.resizeListener();
  }

  teardown() {
  }

  matchesMediaQuery(query) {
    if (this.stubbedMediaFeatures) {
      return matchQuery(query, this.stubbedMediaFeatures);
    } else {
      return false;
    }
  }

  _windowDidResize() {
    this.listeners.forEach((l) => l(this.dimensions));
  }
}
