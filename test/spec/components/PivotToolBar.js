'use strict';

describe('PivotToolBar', function () {
  var React = require('react/addons');
  var PivotToolBar, component;

  beforeEach(function () {
    PivotToolBar = require('components/PivotToolBar.js');
    component = React.createElement(PivotToolBar);
  });

  it('should create a new instance of PivotToolBar', function () {
    expect(component).toBeDefined();
  });
});
