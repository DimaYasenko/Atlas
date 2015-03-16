'use strict';

describe('AtlasPivot', function () {
  var React = require('react/addons');
  var AtlasPivot, component;

  beforeEach(function () {
    AtlasPivot = require('components/AtlasPivot.js');
    component = React.createElement(AtlasPivot);
  });

  it('should create a new instance of AtlasPivot', function () {
    expect(component).toBeDefined();
  });
});
