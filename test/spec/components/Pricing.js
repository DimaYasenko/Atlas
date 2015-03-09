'use strict';

describe('Pricing', function () {
  var React = require('react/addons');
  var Pricing, component;

  beforeEach(function () {
    Pricing = require('components/Pricing.js');
    component = React.createElement(Pricing);
  });

  it('should create a new instance of Pricing', function () {
    expect(component).toBeDefined();
  });
});
