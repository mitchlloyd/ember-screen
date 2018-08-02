'use strict';

module.exports = {
  name: 'ember-screen',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/shims/css-mediaquery.js');
  }
};
