import EmberScreen, { breakpoint } from 'ember-screen';

export default class ScreenService extends EmberScreen {
  @breakpoint('(min-width: 34em)') isSmallAndUp;
  @breakpoint('(min-width: 48em)') isMediumAndUp;
  @breakpoint('(min-width: 62em)') isLargeAndUp;
  @breakpoint('(min-width: 75em)') isExtraLargeAndUp;

  @breakpoint('(max-width: 33.9999em)') isExtraSmallAndDown;
  @breakpoint('(max-width: 47.9999em)') isSmallAndDown;
  @breakpoint('(max-width: 61.9999em)') isMediumAndDown;
  @breakpoint('(max-width: 74.9999em)') isLargeAndDown;
}
