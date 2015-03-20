'use strict';

describe('WellBoresBoard', function () {
  var React = require('react/addons');
  var WellBoresBoard, component;

  beforeEach(function () {
    WellBoresBoard = require('components/WellBoresBoard.js');
    component = React.createElement(WellBoresBoard);
  });

  it('should create a new instance of WellBoresBoard', function () {
    expect(component).toBeDefined();
  });
});
