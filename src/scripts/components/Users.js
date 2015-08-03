'use strict';

import React from 'react';
import {RouteHandler, Link} from 'react-router';
import {NavItemLink } from 'react-router-bootstrap';

export default React.createClass({
	render: function() {
		return (
			<div>
				<ul className="nav nav-tabs">
					<NavItemLink to="admins">Admins</NavItemLink>
					<NavItemLink to="tenants">Tenants</NavItemLink>
					<NavItemLink to="employees">Employees</NavItemLink>
				</ul>
				<RouteHandler />
			</div>
		);
	}
});