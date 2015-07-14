'use strict';

var React = require('react/addons');

require('styles/SideBarToggleButton.css');

var SideBarToggleButton = React.createClass({
  render: function () {
  	var style = {
  		float: 'left',		
		padding: '15px 15px',
	  	fontFamily: 'fontAwesome',
	  	borderRight: '1px solid #eee'
  	};
    return (
        <a href="#" className="sidebar-toggle" role="button" style={style}>
        	<i className="fa fa-bars"></i>
            <span className="sr-only">Toggle navigation</span>           
          </a>
      );
  }
});

module.exports = SideBarToggleButton; 

