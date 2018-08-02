import { computed } from '@ember/object';

export default function breakpoint(mediaQuery) {
  return computed('width', function() {
    return this.win.matchesMediaQuery(mediaQuery);
  });
}
