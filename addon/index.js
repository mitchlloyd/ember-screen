import Ember from 'ember';
import Window from './window';
const { computed } = Ember;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.win = new Window();
    this.win.onSizeUpdate(this.handleResize.bind(this));
  },

  willDestroy() {
    this.win.teardown();
  },

  handleResize({ width, height }) {
    this.set('width', width);
    this.set('height', height);
  }
});

export function breakpoint(mediaQuery) {
  return computed('width', function() {
    return this.win.matchesMediaQuery(mediaQuery);
  });
}
