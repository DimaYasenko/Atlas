'use strict';

describe('JobBoard', function () {
  var React = require('react/addons');
  var JobBoard, component;

  beforeEach(function () {
    JobBoard = require('components/JobBoard.js');
    component = React.createElement(JobBoard);
  });

  it('should create a new instance of JobBoard', function () {
    expect(component).toBeDefined();
  });
});
