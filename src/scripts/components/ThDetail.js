'use strict';

var React = require('react/addons');

require('styles/ThDetail.css');

var ReactBootstrap = require('react-bootstrap'),
	{ Col, Well } = ReactBootstrap;


var ThDetail = React.createClass({
  render: function () {
  	var wells = this.props.items.map(function(d, id) {
  		return (<Col xs={1} key={id}><Well >{d}</Well></Col>);
  	});
    return (
        <div>
          {wells}
        </div>
      );
  }
});

module.exports = ThDetail; 

