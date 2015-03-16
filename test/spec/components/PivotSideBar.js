'use strict';

describe('PivotSideBar', function () {
  var React = require('react/addons');
  var PivotSideBar, component;

  beforeEach(function () {
    PivotSideBar = require('components/PivotSideBar.js');
    component = React.createElement(PivotSideBar);
  });

  it('should create a new instance of PivotSideBar', function () {
    expect(component).toBeDefined();
  });
});
