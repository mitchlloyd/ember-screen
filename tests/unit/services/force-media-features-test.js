import { module, test } from 'qunit';
import EmberScreen, { breakpoint } from 'ember-screen';

module('Unit | Service | force-media-features', function () {
  test('it lets users force specific media features for testing', function (assert) {
    class ScreenService extends EmberScreen {
      @breakpoint('tv and (min-width: 3840px)') is4KTV;
    }

    let screen = new ScreenService();

    assert.notOk(
      screen.get('is4KTV'),
      'At first screen does not believe it is a 4K TV'
    );

    screen.stubMediaFeatures({
      type: 'tv',
      width: '3840px',
    });

    assert.ok(
      screen.get('is4KTV'),
      'After stubbing, screen reports it is a 4K TV'
    );
  });
});
