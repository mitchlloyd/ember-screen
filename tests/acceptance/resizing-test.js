import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | resizing', {
  beforeEach() {
    this.popup = window.open('/index.html', 'resizable', `resizable=yes,width=200,height=100`);
  },

  afterEach() {
    this.popup.close();
  },
});

test('visiting /resizing', function(assert) {
  waitForDimensions(this.popup, { width: "200", height: "100"});

  andThen(() => {
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
  });

  waitForDimensions(this.popup, { width: "900", height: "500" });

  andThen(() => {
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
});

function serializeMediaQueries(doc) {
  let data = {};

  doc.find('#media-queries dt').toArray().forEach(function(dt) {
    data[$(dt).text().trim()] = $(dt).next().text().trim();
  });

  return data;
}
