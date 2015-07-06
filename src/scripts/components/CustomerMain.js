'use strict';

var React = require('react/addons');
import ThDetail from './ThDetail';

require('styles/CustomerMain.css');

var CustomerMain = React.createClass({
  render: function () {
  	var items = this.props.customers.map( d => d.name);
    return (
        <ThDetail items={items} />
      );
  }
});

module.exports = CustomerMain; 

