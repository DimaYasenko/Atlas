'use strict';

var React = require('react/addons');

require('styles/ThDetail.css');

import {Col, Well} from 'react-bootstrap';
 // var ReactBootstrap = require('react-bootstrap'),
	// { Col, Well } = ReactBootstrap;


var ThDetail = React.createClass({
  render () {
  	var wells = this.props.items.map((d, id) => <Col xs={1} key={id}><Well >{d}</Well></Col>);
    return (
        <div>
          {wells}
        </div>
      );
  }
});

module.exports = ThDetail; 

