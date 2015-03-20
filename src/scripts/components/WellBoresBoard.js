'use strict';

var React = require('react/addons');

require('styles/WellBoresBoard.css');

var WellBoresBoard = React.createClass({
  render: function () {
    return (
        <ThDetail items={this.state.wellbores}/>
      );
  }
});

module.exports = WellBoresBoard; 

