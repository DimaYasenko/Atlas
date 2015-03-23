'use strict';

describe('JobOneByOne', function () {
  var React = require('react/addons');
  var JobOneByOne, component;

  beforeEach(function () {
    JobOneByOne = require('components/JobOneByOne.js');
    component = React.createElement(JobOneByOne);
  });

  it('should create a new instance of JobOneByOne', function () {
    expect(component).toBeDefined();
  });
});
