'use strict';

describe('Support', function () {
  var React = require('react/addons');
  var Support, component;

  beforeEach(function () {
    Support = require('components/Support.js');
    component = React.createElement(Support);
  });

  it('should create a new instance of Support', function () {
    expect(component).toBeDefined();
  });
});
