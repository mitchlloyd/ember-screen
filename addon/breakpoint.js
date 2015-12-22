import Ember from 'ember';
const { computed } = Ember;

export default function breakpoint(mediaQuery) {
  return computed('width', function() {
    return this.win.matchesMediaQuery(mediaQuery);
  });
}
