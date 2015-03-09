'use strict';

describe('TryForFree', function () {
  var React = require('react/addons');
  var TryForFree, component;

  beforeEach(function () {
    TryForFree = require('components/TryForFree.js');
    component = React.createElement(TryForFree);
  });

  it('should create a new instance of TryForFree', function () {
    expect(component).toBeDefined();
  });
});
