'use strict';

import React from 'react/addons';
import CustomerStore from '../stores/CustomerStore';
import CustomerActions from '../actions/CustomerActions';
import FeatureDetailToolBar from './FeatureDetailToolBar';
import { RouteHandler } from 'react-router';

require('styles/CustomerBoard.css');

function getState() {
	let customers = CustomerStore.getAll().customers;
	return {
		customers: customers,
		loaded: customers.length > 0
	};
}

var CustomerBoard = React.createClass({
	getInitialState: function() {
		CustomerActions.loadCustomers();
		return getState();
	},
	componentDidMount: function() {
		CustomerStore.addChangeListener(this._onChange);
	},
	componentDidUpdate: function(prevProps, prevState) {
		CustomerStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getState());
	},
	render: function () {
		if (!this.state.loaded) {
			return (<div>Loading...</div>);
		}

		return (
		    <div>
		    	<FeatureDetailToolBar boardRouteName="customerBoard" oneByOneRouteName="customerOneByOne" listRouteName="customerList"/>
			      <p>Content for CustomerBoard</p>
			      <span>Count: {this.state.customers.length}</span>
			      <RouteHandler customers={this.state.customers}/>
		    </div>
		  );
	}
});

module.exports = CustomerBoard; 

