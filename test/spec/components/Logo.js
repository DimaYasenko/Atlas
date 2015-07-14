'use strict';

describe('Logo', function () {
  var React = require('react/addons');
  var Logo, component;

  beforeEach(function () {
    Logo = require('components/Logo.js');
    component = React.createElement(Logo);
  });

  it('should create a new instance of Logo', function () {
    expect(component).toBeDefined();
  });
});
