import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';
const { RSVP, run } = Ember;

moduleForAcceptance('Acceptance | resizing', {
  beforeEach() {
    this.popup = window.open('/', 'resizable', 'resizable=yes,width=100,height=100');
  },

  afterEach() {
    this.popup.close();
  },
});

test('visiting /resizing', function(assert) {
  andThen(() => {
    read(this.popup, 'width').then(function(value) {
      assert.equal(value, "100", "Initial height is correct");
    });
  });
});

function read(_window, term) {
  return new RSVP.Promise(function(resolve, reject) {
    let tries = 0;

    let polling = function() {
      let dd = findDataDefinition($(_window.document), term);

      if (dd.length) {
        resolve(dd.text().trim());
      }

      if (tries > 100) {
        reject();
      } else {
        tries = tries + 1;
        run.later(polling, 10);
      }
    };

    polling();
  });
}

function findDataDefinition(doc, term) {
  return doc.find(`dt:contains(${term}) + dd`);
}
