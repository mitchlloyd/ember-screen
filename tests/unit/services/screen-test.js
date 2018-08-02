import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | screen', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.screen = this.owner.lookup('service:screen');
    this.win = this.screen.win;
    this.observerCount = 0;
  });

  test('it updates width and height when screen dimensions change', function(assert) {
    this.screen.addObserver('width', 'height', () => {
      this.observerCount += 1;
    });

    this.win.stubMediaFeatures({ width: 100, height: 200 });

    assert.equal(this.observerCount, 1, "observer was called once");
    assert.equal(this.screen.get('width'), 100, "size was updated");
    assert.equal(this.screen.get('height'), 200, "height was updated");
  });

  test('it updates media query properties when screen dimensions change', function(assert) {
    // Get the computed property so that is has been initialized.
    this.screen.get('isSmallAndUp');

    // Make sure that the computed property is updating bindings.
    this.screen.addObserver('isSmallAndUp', () => {
      this.observerCount += 1;
    });

    this.win.matchesMediaQuery = function() { return false; };
    this.win.stubMediaFeatures({ width: 100, height: 200 });

    assert.equal(this.observerCount, 1, "observer was called once");
    assert.equal(this.screen.get('isSmallAndUp'), false, "media query returns initial stubbed value");

    this.win.matchesMediaQuery = function() { return true; };
    this.win.stubMediaFeatures({ width: 200, height: 200 });

    assert.equal(this.observerCount, 2, "observer was called again");
    assert.equal(this.screen.get('isSmallAndUp'), true, "media query returns new stubbed value");
  });
});
