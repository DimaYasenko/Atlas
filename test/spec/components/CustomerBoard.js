'use strict';

describe('CustomerBoard', function () {
  var React = require('react/addons');
  var CustomerBoard, component;

  beforeEach(function () {
    CustomerBoard = require('components/CustomerBoard.js');
    component = React.createElement(CustomerBoard);
  });

  it('should create a new instance of CustomerBoard', function () {
    expect(component).toBeDefined();
  });
});
