import EmberScreen, { breakpoint } from 'ember-screen';

export default EmberScreen.extend({
  isSmallAndUp: breakpoint('(min-width: 34em)'),
  isMediumAndUp: breakpoint('(min-width: 48em)'),
  isLargeAndUp: breakpoint('(min-width: 62em)'),
  isExtraLargeAndUp: breakpoint('(min-width: 75em)'),

  isExtraSmallAndDown: breakpoint('(max-width: 33.9999em)'),
  isSmallAndDown: breakpoint('(max-width: 47.9999em)'),
  isMediumAndDown: breakpoint('(max-width: 61.9999em)'),
  isLargeAndDown: breakpoint('(max-width: 74.9999em)'),
});
