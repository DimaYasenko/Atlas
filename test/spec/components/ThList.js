'use strict';

describe('ThList', function () {
  var React = require('react/addons');
  var ThList, component;

  beforeEach(function () {
    ThList = require('components/ThList.js');
    component = React.createElement(ThList);
  });

  it('should create a new instance of ThList', function () {
    expect(component).toBeDefined();
  });
});
