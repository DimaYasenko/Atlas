'use strict';

describe('FeatureDetailToolBar', function () {
  var React = require('react/addons');
  var FeatureDetailToolBar, component;

  beforeEach(function () {
    FeatureDetailToolBar = require('components/FeatureDetailToolBar.js');
    component = React.createElement(FeatureDetailToolBar);
  });

  it('should create a new instance of FeatureDetailToolBar', function () {
    expect(component).toBeDefined();
  });
});
