'use strict';

describe('GetDemo', function () {
  var React = require('react/addons');
  var GetDemo, component;

  beforeEach(function () {
    GetDemo = require('components/GetDemo.js');
    component = React.createElement(GetDemo);
  });

  it('should create a new instance of GetDemo', function () {
    expect(component).toBeDefined();
  });
});
