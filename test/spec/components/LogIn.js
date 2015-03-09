'use strict';

describe('LogIn', function () {
  var React = require('react/addons');
  var LogIn, component;

  beforeEach(function () {
    LogIn = require('components/LogIn.js');
    component = React.createElement(LogIn);
  });

  it('should create a new instance of LogIn', function () {
    expect(component).toBeDefined();
  });
});
