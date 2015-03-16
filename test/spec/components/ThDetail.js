'use strict';

describe('ThDetail', function () {
  var React = require('react/addons');
  var ThDetail, component;

  beforeEach(function () {
    ThDetail = require('components/ThDetail.js');
    component = React.createElement(ThDetail);
  });

  it('should create a new instance of ThDetail', function () {
    expect(component).toBeDefined();
  });
});
