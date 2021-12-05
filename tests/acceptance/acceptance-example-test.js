import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | temp', function(hooks) {
  setupApplicationTest(hooks);

  test('forcing media features in an acceptance test', async function(assert) {
    let screen = this.owner.lookup('service:screen');
    screen.stubMediaFeatures({ width: '1px' });

    await visit('/');

    assert.ok(screen.get('isExtraSmallAndDown'), "Media is matched");

    screen.stubMediaFeatures({ width: '1000px' });

    assert.notOk(screen.get('isExtraSmallAndDown'), "Media is not matched");
  });
});
