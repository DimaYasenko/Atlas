'use strict';

describe('User', function () {
  var React = require('react/addons');
  var User, component;

  beforeEach(function () {
    User = require('components/User.js');
    component = React.createElement(User);
  });

  it('should create a new instance of User', function () {
    expect(component).toBeDefined();
  });
});
