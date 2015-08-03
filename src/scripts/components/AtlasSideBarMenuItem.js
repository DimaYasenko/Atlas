'use strict';

var React = require('react/addons');
import {Link} from 'react-router';
var AtlasSideBarMenuItem = React.createClass({
	propTypes: {
		label: React.PropTypes.any,
		icon: React.PropTypes.string,
		link: React.PropTypes.string
	},
	getDefaultProps: function() {
		return {
			label: '',
			icon: '',
			link: '/'
		};
	},
	render: function() {
		var iconClass = 'fa fa-' + this.props.icon;
		var subMenu = React.Children.count(this.props.children) > 0? (<ul className="treeview-menu">{this.props.children}</ul>)
														: (<span />);

		var expander = React.Children.count(this.props.children) > 0? (<i className="fa fa-angle-left pull-right"/>)
																	: (<span />);

		return (<li className="treeview">
              <Link to={this.props.link}>
                <i className={iconClass}></i>{this.props.label}{expander}
              </Link>
              	{subMenu}
              </li>);

	}
});

module.exports = AtlasSideBarMenuItem;

 