'use strict';

describe('AtlasSideBarMenu', function () {
  var React = require('react/addons');
  var AtlasSideBarMenu, component;

  beforeEach(function () {
    AtlasSideBarMenu = require('components/AtlasSideBarMenu.js');
    component = React.createElement(AtlasSideBarMenu);
  });

  it('should create a new instance of AtlasSideBarMenu', function () {
    expect(component).toBeDefined();
  });
});
