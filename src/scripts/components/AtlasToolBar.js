'use strict';

var React = require('react/addons');

require('styles/AtlasToolBar.css');
var ReactBootstrap = require('react-bootstrap'),
	{ Col, Button, Panel } = ReactBootstrap;

import Logo from './Logo';
import SideBarToggleButton from './SideBarToggleButton';
import AtlasToolBarMenu from './AtlasToolBarMenu';

/*
Назначение:
  Содержит наиболее часто используемые действия, к-ые потенциально нужны на каждой странице.

*/
var PivotToolBar = React.createClass({
  propTypes: {
    isCollapsed: React.PropTypes.bool, 
    isFixed: React.PropTypes.bool,
    largeLogoText: React.PropTypes.string,
    smallLogoText: React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      isCollapsed: false,
      isFixed: true,
      largeLogoText: 'Atlas Tool',
      smallLogoText: 'Atlas'
    };
  },
  render: function () {
    var navStyle = {
        marginLeft: 230,
        marginBottom: 0       
    };

    return (
        <header className="main-header PivotToolBar">
          <Logo 
            isSmall={this.props.isCollapsed}
            largeLogoText={this.props.largeLogoText}
            smallLogoText={this.props.smallLogoText}
          />
          <nav className="navbar navbar-static-top" role="navigation" style={navStyle}>
            <SideBarToggleButton />
            <AtlasToolBarMenu />
          </nav>
        </header>
      );
  }
});

module.exports = PivotToolBar; 

