'use strict';

describe('FeatureDetail', function () {
  var React = require('react/addons');
  var FeatureDetail, component;

  beforeEach(function () {
    FeatureDetail = require('components/FeatureDetail.js');
    component = React.createElement(FeatureDetail);
  });

  it('should create a new instance of FeatureDetail', function () {
    expect(component).toBeDefined();
  });
});
