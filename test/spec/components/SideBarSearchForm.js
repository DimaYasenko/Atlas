'use strict';

describe('SideBarSearchForm', function () {
  var React = require('react/addons');
  var SideBarSearchForm, component;

  beforeEach(function () {
    SideBarSearchForm = require('components/SideBarSearchForm.js');
    component = React.createElement(SideBarSearchForm);
  });

  it('should create a new instance of SideBarSearchForm', function () {
    expect(component).toBeDefined();
  });
});
