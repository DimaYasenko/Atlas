'use strict';

describe('SideBarToggleButton', function () {
  var React = require('react/addons');
  var SideBarToggleButton, component;

  beforeEach(function () {
    SideBarToggleButton = require('components/SideBarToggleButton.js');
    component = React.createElement(SideBarToggleButton);
  });

  it('should create a new instance of SideBarToggleButton', function () {
    expect(component).toBeDefined();
  });
});
