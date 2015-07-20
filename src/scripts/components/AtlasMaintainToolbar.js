'use strict';

import React from 'react/addons';

function doNothing() {
	alert('WTF');
}
function always() { return true;}

var AtlasMaintainToolbar = React.createClass({
	propTypes: {
		onAdd: React.PropTypes.func,
		onEdit: React.PropTypes.func,
		onDelete: React.PropTypes.func,

		canBeAdded: React.PropTypes.func,
		canBeEdited: React.PropTypes.func,
		canBeDeleted: React.PropTypes.func,

		selectedRecord: React.PropTypes.object
	},
	getDefaultProps: function() {
		var self = this;
		return {
			onAdd: doNothing,
			onEdit: doNothing,
			onDelete: doNothing,


			canBeAdded: always,
			canBeEdited: always,
			canBeDeleted: always,
			
			selectedRecord: null
		};
	},
	render: function() {

		var canBeAdded = () => true && this.props.canBeAdded,
			canBeEdited = (record) => record != null && this.props.canBeEdited,
			canBeDeleted = (record) => record != null && this.props.canBeDeleted,

			onDelete = function (record) { 
				if (confirm('Are you sure?')) {
					this.props.onDelete(record);
				} 
			};


		return (<div className="btn-toolbar" role="toolbar" aria-label="toolbar">				
			  <button 	type="button" 
			  			className="btn btn-default" 
			  			onClick={this.props.onAdd.bind(this)}
			  			disabled={!canBeAdded()}>
			  		<i className="fa fa-plus-circle" style={{color:'green'}}/>&nbsp;
			  		<span>Add</span></button>
			  <button 	type="button"
			  			className="btn btn-default"
			  			onClick={this.props.onEdit.bind(this, this.props.selectedRecord)}
			  			disabled={!canBeEdited(this.props.selectedRecord)} >
			  		<i className="fa fa-pencil"/>&nbsp;
			  		<span>Edit</span>
			  </button>
			  <button 	type="button" 
			  			className="btn btn-default" 
			  			onClick={onDelete.bind(this, this.props.selectedRecord)}
			  			disabled={!canBeDeleted(this.props.selectedRecord)}>
			  		<i className="fa fa-trash-o" style={{color:'red'}}/>&nbsp;
			  		<span>Delete</span>
		  	   </button>
			</div>);       
	}
});


module.exports = AtlasMaintainToolbar;