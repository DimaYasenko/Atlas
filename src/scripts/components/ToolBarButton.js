'use strict';

var React = require('react/addons');

require('styles/ToolBarButton.css');

var ToolBarButton = React.createClass({

  	render: function () {

	var labelType = 'label label-' + (this.props.label || 'success');
	var icon = 'fa fa-' + (this.props.icon || '');
	console.log(icon);
    return (
        <li className="ToolBarButton dropdown messages-menu">
                <a href="#" className="dropdown-toggle">
                  <i className={icon}></i>                   
                  	{
                  		this.props.hasCount? (<span className={labelType}>{this.props.count || 0}</span>)
                  							: (<span />)
          			}
                </a>
                
      	</li>
      );
  }
});

module.exports = ToolBarButton; 

