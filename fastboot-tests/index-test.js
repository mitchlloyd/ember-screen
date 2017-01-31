var expect = require('chai').expect;

describe('index', function() {

  it('renders', function() {
    return this.visit('/')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        expect($('body').length).to.equal(1);
        expect($('h1').text().trim()).to.equal('ember-fastboot-addon-tests');
        expect($('#dimensions').length).to.equal(1);
        expect($('#media-queries').length).to.equal(1);
      });
  });

});