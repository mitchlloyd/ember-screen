import $ from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import waitForDimensions from 'dummy/tests/helpers/wait-for-dimensions';

module('Acceptance | resizing', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.popup = window.open('http://localhost:4200', 'resizable', `resizable=yes,width=200,height=100`);
  });

  hooks.afterEach(function() {
    this.popup.close();
  });

  test('visiting /resizing', async function(assert) {
    await waitForDimensions(this.popup, { width: "200", height: "100"});

    assert.deepEqual(serializeMediaQueries($(this.popup.document)), {
      isSmallAndUp: "false",
      isMediumAndUp: "false",
      isLargeAndUp: "false",
      isExtraLargeAndUp: "false",

      isExtraSmallAndDown: "true",
      isSmallAndDown: "true",
      isMediumAndDown: "true",
      isLargeAndDown: "true"
    }, "Initial values are correct");

    // resizeBy is easier to work with than resizeTo
    this.popup.resizeBy(700, 400);

    await waitForDimensions(this.popup, { width: "900", height: "500" });

    assert.deepEqual(serializeMediaQueries($(this.popup.document)), {
      isSmallAndUp: "true",
      isMediumAndUp: "true",
      isLargeAndUp: "false",
      isExtraLargeAndUp: "false",

      isExtraSmallAndDown: "false",
      isSmallAndDown: "false",
      isMediumAndDown: "true",
      isLargeAndDown: "true"
    }, "Updated values are correct");
  });

  function serializeMediaQueries(doc) {
    let data = {};

    doc.find('#media-queries dt').toArray().forEach(function(dt) {
      data[$(dt).text().trim()] = $(dt).next().text().trim();
    });

    return data;
  }
});
