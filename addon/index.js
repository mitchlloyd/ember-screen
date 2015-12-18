import Ember from 'ember';
const { computed } = Ember;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this._width = undefined;
    this._height = undefined;
    this.resizeListener = this.handleResize.bind(this);

    window.addEventListener('resize', this.resizeListener);
    this.handleResize();
  },

  willDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  },

  width: computed('_width', function() {
    return this.get('_width');
  }),

  height: computed('_width', function() {
    return this.get('_height');
  }),

  handleResize() {
    this.set('_width', window.innerWidth);
    this.set('_height', window.innerHeight);
  }
});

export function breakpoint(mediaQuery) {
  return computed('width', function() {
    return window.matchMedia(mediaQuery).matches;
  });
}
