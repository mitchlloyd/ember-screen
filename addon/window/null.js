import { matchQuery } from 'css-mediaquery';

export default class {
  constructor() {
    this.listeners = [];
    this.stubbedMediaFeatures = {};
  }

  onSizeUpdate(listener) {
    // Immediately call the listener to set initial size
    listener(this.dimensions);

    this.listeners.push(listener);
  }

  get dimensions() {
    return {
      width: this.stubbedMediaFeatures.width,
      height: this.stubbedMediaFeatures.height
    };
  }

  stubMediaFeatures(features) {
    this.stubbedMediaFeatures = features;
    this.listeners.forEach((l) => l(this.dimensions));
  }

  teardown() {}

  matchesMediaQuery(query) {
    return matchQuery(query, this.stubbedMediaFeatures);
  }
}
