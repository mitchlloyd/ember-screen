'use strict';
/*jshint node:true*/
/* global describe, it, require */
const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

function serializeMediaQueries($) {
  let data = {};

  $('#media-queries dt')
    .toArray()
    .forEach(function (dt) {
      data[$(dt).text().trim()] = $(dt).next().text().trim();
    });

  return data;
}

describe('index', function () {
  setupTest();

  it('renders', function () {
    return this.visit('/').then(function (res) {
      let $ = res.jQuery;
      expect($('body').length).to.equal(1);
      expect($('h1').text().trim()).to.equal('ember-fastboot-addon-tests');
      expect($('#dimensions').length).to.equal(1);
      expect($('#media-queries').length).to.equal(1);
    });
  });

  it('can stub media features', function () {
    return this.visit('/').then(function (res) {
      let $ = res.jQuery;
      expect($('#width').text().trim()).to.equal('900'); // see fixtures/fastboot/app/instance-initializers/fastboot/stub-media.js
      expect(serializeMediaQueries($)).to.deep.equal({
        isSmallAndUp: 'true',
        isMediumAndUp: 'true',
        isLargeAndUp: 'false',
        isExtraLargeAndUp: 'false',

        isExtraSmallAndDown: 'false',
        isSmallAndDown: 'false',
        isMediumAndDown: 'true',
        isLargeAndDown: 'true',
      });
    });
  });
});
