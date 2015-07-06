'use strict';

describe('CustomerMain', function () {
  var React = require('react/addons');
  var CustomerMain, component;

  beforeEach(function () {
    CustomerMain = require('components/CustomerMain.js');
    component = React.createElement(CustomerMain);
  });

  it('should create a new instance of CustomerMain', function () {
    expect(component).toBeDefined();
  });
});
