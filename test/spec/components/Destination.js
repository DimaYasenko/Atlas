'use strict';

describe('Destination', function () {
  var React = require('react/addons');
  var Destination, component;

  beforeEach(function () {
    Destination = require('components/Destination.js');
    component = React.createElement(Destination);
  });

  it('should create a new instance of Destination', function () {
    expect(component).toBeDefined();
  });
});
