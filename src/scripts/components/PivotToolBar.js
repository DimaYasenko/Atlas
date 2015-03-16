'use strict';

var React = require('react/addons');

require('styles/PivotToolBar.css');
var ReactBootstrap = require('react-bootstrap'),
	{ Col, Button, Panel } = ReactBootstrap;

var PivotToolBar = React.createClass({
  render: function () {
    return (
        <div>
          <Panel>
          	PivotToolBar
          </Panel>
        </div>
      );
  }
});

module.exports = PivotToolBar; 

