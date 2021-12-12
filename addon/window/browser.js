import { matchQuery } from 'css-mediaquery';

export default class {
  constructor() {
    this.listeners = [];
    this.resizeListener = this._windowDidResize.bind(this);
    this.stubbedMediaFeatures = false;
    window.addEventListener('resize', this.resizeListener);
  }

  onSizeUpdate(listener) {
    // Immediately call the listener to set initial size
    listener(this.dimensions);

    this.listeners.push(listener);
  }

  get dimensions() {
    if (this.stubbedMediaFeatures) {
      return {
        width: this.stubbedMediaFeatures.width || window.innerWidth,
        height: this.stubbedMediaFeatures.height || window.innerHeight,
      };
    } else {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
  }

  stubMediaFeatures(features) {
    this.stubbedMediaFeatures = features;
    this.resizeListener();
  }

  teardown() {
    window.removeEventListener('resize', this.resizeListener);
  }

  matchesMediaQuery(query) {
    if (this.stubbedMediaFeatures) {
      return matchQuery(query, this.stubbedMediaFeatures);
    } else {
      return window.matchMedia(query).matches;
    }
  }

  _windowDidResize() {
    this.listeners.forEach((l) => l(this.dimensions));
  }
}
