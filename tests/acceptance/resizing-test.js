import { module, test, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import waitForWidth from 'dummy/tests/helpers/wait-for-width';

const HEIGHT = 500;
const isHeadlessChrome = /HeadlessChrome/.test(window.navigator.userAgent);

module('Acceptance | resizing', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.popup = window.open('/index.html', 'resizable', `resizable=yes`);
    this.popup.addEventListener('load', (event) => {
      event.currentTarget.DummyApplication.visit('/');
    });
  });

  hooks.afterEach(function () {
    this.popup.close();
  });

  if (isHeadlessChrome) {
    skip('Skipping Chrome resizing integration test');
    return;
  }

  test('visiting /resizing', async function (assert) {
    this.popup.resizeTo(200, HEIGHT);
    await waitForWidth(this.popup, 200);

    assert.deepEqual(
      serializeMediaQueries(this.popup.document),
      {
        isSmallAndUp: 'false',
        isMediumAndUp: 'false',
        isLargeAndUp: 'false',
        isExtraLargeAndUp: 'false',

        isExtraSmallAndDown: 'true',
        isSmallAndDown: 'true',
        isMediumAndDown: 'true',
        isLargeAndDown: 'true',
      },
      'Initial values are correct'
    );

    this.popup.resizeTo(900, HEIGHT);
    await waitForWidth(this.popup, 900);

    assert.deepEqual(
      serializeMediaQueries(this.popup.document),
      {
        isSmallAndUp: 'true',
        isMediumAndUp: 'true',
        isLargeAndUp: 'false',
        isExtraLargeAndUp: 'false',

        isExtraSmallAndDown: 'false',
        isSmallAndDown: 'false',
        isMediumAndDown: 'true',
        isLargeAndDown: 'true',
      },
      'Updated values are correct'
    );
  });

  function serializeMediaQueries(doc) {
    let data = {};

    doc.querySelectorAll('#media-queries dt').forEach(function (dt) {
      data[dt.textContent.trim()] = dt.nextElementSibling.textContent.trim();
    });

    return data;
  }
});
