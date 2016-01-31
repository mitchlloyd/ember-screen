import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | temp');

test('forcing media features in an acceptance test', function(assert) {
  let screen = this.application.__container__.lookup('service:screen');
  screen.stubMediaFeatures({ width: '1px' });

  visit('/');

  andThen(function() {
    assert.ok(screen.get('isExtraSmallAndDown'), "Media is matched");
    screen.stubMediaFeatures({ width: '1000px' });
  });

  assert.ok(screen.get('isExtraSmallAndDown'), "Media is not matched");
});
