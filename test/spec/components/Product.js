'use strict';

describe('Product', function () {
  var React = require('react/addons');
  var Product, component;

  beforeEach(function () {
    Product = require('components/Product.js');
    component = React.createElement(Product);
  });

  it('should create a new instance of Product', function () {
    expect(component).toBeDefined();
  });
});
