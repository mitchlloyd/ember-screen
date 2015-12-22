export default class {
  constructor() {
    this.listeners = [];
    this.resizeListener = this._windowDidResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  onSizeUpdate(listener) {
    // Immediately call the listener to set initial size
    listener(this.dimensions);

    this.listeners.push(listener);
  }

  get dimensions() {
    return this._dimensions || { width: window.innerWidth, height: window.innerHeight };
  }

  // For testing
  set dimensions(dimensions) {
    this._dimensions = dimensions;
    this.listeners.forEach((l) => l(dimensions));
  }

  teardown() {
    window.removeEventListener('resize', this.resizeListener);
  }

  matchesMediaQuery(query) {
    return window.matchMedia(query).matches;
  }

  _windowDidResize() {
    this.listeners.forEach((l) => l(this.dimensions));
  }
}
