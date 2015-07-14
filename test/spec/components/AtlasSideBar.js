'use strict';

describe('AtlasSideBar', function () {
  var React = require('react/addons');
  var AtlasSideBar, component;

  beforeEach(function () {
    AtlasSideBar = require('components/AtlasSideBar.js');
    component = React.createElement(AtlasSideBar);
  });

  it('should create a new instance of AtlasSideBar', function () {
    expect(component).toBeDefined();
  });
});
