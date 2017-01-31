var expect = require('chai').expect;

function serializeMediaQueries($) {
  let data = {};

  $('#media-queries dt').toArray().forEach(function(dt) {
    data[$(dt).text().trim()] = $(dt).next().text().trim();
  });

  return data;
}

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

  it('can stub media features', function() {
    return this.visit('/')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        expect($('#width').text().trim()).to.equal('900'); // see fixtures/fastboot/app/instance-initializers/fastboot/stub-media.js
        expect(serializeMediaQueries($)).to.deep.equal({
          isSmallAndUp: "true",
          isMediumAndUp: "true",
          isLargeAndUp: "false",
          isExtraLargeAndUp: "false",

          isExtraSmallAndDown: "false",
          isSmallAndDown: "false",
          isMediumAndDown: "true",
          isLargeAndDown: "true"
        });
      });
  });

});