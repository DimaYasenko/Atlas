'use strict';

describe('Fake', function () {
  var React = require('react/addons');
  var Fake, component;

  beforeEach(function () {
    Fake = require('components/Fake.js');
    component = React.createElement(Fake);
  });

  it('should create a new instance of Fake', function () {
    expect(component).toBeDefined();
  });
});
