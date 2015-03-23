'use strict';

import React from 'react/addons';
import JobBoardStore from '../stores/JobStore';

require('styles/JobBoard.css');

import ThDetail from './ThDetail';


var JobBoard = React.createClass({
	getInitialState: function () {
	    return this.getState();
	},
	 componentDidMount: function() {
	    JobBoardStore.addChangeListener(this._onChange);
	  },

	  componentWillUnmount: function() {
	    JobBoardStore.removeChangeListener(this._onChange);
	  },
  	render: function () {  		
    	return (
	        <ThDetail items={this.props.jobs}/>
	      );
	  },
  _onChange () {
  	this.setState(this.getState());
  },
  getState() {
  	return JobBoardStore.getAll();
  }
});

module.exports = JobBoard; 

