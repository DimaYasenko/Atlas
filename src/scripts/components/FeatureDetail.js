'use strict';

var React = require('react/addons');

require('styles/FeatureDetail.css');


var ReactBootstrap = require('react-bootstrap'),
	{ Col, Button, Alert, Panel } = ReactBootstrap;


var FeatureDetailToolBar = require('./FeatureDetailToolBar');

var FeatureDetail = React.createClass({
  render: function () {

  	var detail = this.props[this.props.mode]; //dynamic dispatching

    return (
        <div>
          <Col xs={12}><FeatureDetailToolBar mode={this.props.mode}/></Col>
          <Col xs={12}>
          <Panel>
          	{detail}
          </Panel>
          </Col>
        </div>
      );
  }
});

module.exports = FeatureDetail; 

