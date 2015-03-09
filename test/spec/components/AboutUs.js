'use strict';

describe('AboutUs', function () {
  var React = require('react/addons');
  var AboutUs, component;

  beforeEach(function () {
    AboutUs = require('components/AboutUs.js');
    component = React.createElement(AboutUs);
  });

  it('should create a new instance of AboutUs', function () {
    expect(component).toBeDefined();
  });
});
