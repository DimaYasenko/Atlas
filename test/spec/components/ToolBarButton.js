'use strict';

describe('ToolBarButton', function () {
  var React = require('react/addons');
  var ToolBarButton, component;

  beforeEach(function () {
    ToolBarButton = require('components/ToolBarButton.js');
    component = React.createElement(ToolBarButton);
  });

  it('should create a new instance of ToolBarButton', function () {
    expect(component).toBeDefined();
  });
});
