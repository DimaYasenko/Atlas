'use strict';

var React = require('react/addons');

require('styles/SideBarToggleButton.css');

var SideBarToggleButton = React.createClass({
  render: function () {
  
    return (
        <a href="#" className="SideBarToggleButton" role="button">
        	
            <span className="sr-only">Toggle navigation</span>           
          </a>
      );  
  }
});

module.exports = SideBarToggleButton; 

