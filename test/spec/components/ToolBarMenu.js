'use strict';

describe('ToolBarMenu', function () {
  var React = require('react/addons');
  var ToolBarMenu, component;

  beforeEach(function () {
    ToolBarMenu = require('components/ToolBarMenu.js');
    component = React.createElement(ToolBarMenu);
  });

  it('should create a new instance of ToolBarMenu', function () {
    expect(component).toBeDefined();
  });
});
