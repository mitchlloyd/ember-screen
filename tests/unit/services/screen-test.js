/* eslint-disable ember/no-observers */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | screen', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.screen = this.owner.lookup('service:screen');
    this.win = this.screen.win;
    this.observerCount = 0;
  });

  test('it updates width and height when screen dimensions change', async function (assert) {
    const observerCalled = new Promise((resolve) => {
      this.screen.addObserver('width', 'height', () => {
        this.observerCount += 1;
        resolve();
      });
    });

    this.win.stubMediaFeatures({ width: 100, height: 200 });

    assert.equal(this.screen.get('width'), 100, 'size was updated');
    assert.equal(this.screen.get('height'), 200, 'height was updated');

    await observerCalled;

    assert.equal(this.observerCount, 1, 'observer was called once');
  });

  test('it updates media query properties when screen dimensions change', async function (assert) {
    // Get the computed property so that is has been initialized.
    this.screen.get('isSmallAndUp');

    const resolvers = [];
    const observer1Called = new Promise((r) => resolvers.push(r));
    const observer2Called = new Promise((r) => resolvers.push(r));
    this.screen.addObserver('isSmallAndUp', () => {
      this.observerCount += 1;
      resolvers.shift()();
    });

    this.win.matchesMediaQuery = function () {
      return false;
    };
    this.win.stubMediaFeatures({ width: 100, height: 200 });

    await observer1Called;
    assert.equal(this.observerCount, 1, 'observer was called once');
    assert.false(
      this.screen.get('isSmallAndUp'),
      'media query returns initial stubbed value'
    );

    this.win.matchesMediaQuery = function () {
      return true;
    };
    this.win.stubMediaFeatures({ width: 200, height: 200 });

    await observer2Called;
    assert.equal(this.observerCount, 2, 'observer was called again');
    assert.true(
      this.screen.get('isSmallAndUp'),
      'media query returns new stubbed value'
    );
  });
});
