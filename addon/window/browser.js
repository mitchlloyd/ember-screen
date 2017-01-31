import Base from './base';

export default class extends Base {
  constructor() {
    super();
    window.addEventListener('resize', this.resizeListener);
  }

  get dimensions() {
    if (this.stubbedMediaFeatures) {
      return {
        width: this.stubbedMediaFeatures.width || window.innerWidth,
        height: this.stubbedMediaFeatures.height || window.innerHeight
      };
    } else {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  }

  teardown() {
    window.removeEventListener('resize', this.resizeListener);
  }

  matchesMediaQuery(query) {
    if (this.stubbedMediaFeatures) {
      return super.matchesMediaQuery(query);
    } else {
      return window.matchMedia(query).matches;
    }
  }

}
