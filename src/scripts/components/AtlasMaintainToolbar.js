'use strict';

import React from 'react/addons';
import AtlasModal from 'components/AtlasModal';


function doNothing() {}
function always() { return true;}
function copy (obj) {
	var cpy = {};
	for (var i in obj) {
		cpy[i] = obj[i];
	}
	return cpy;
}

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
		console.log('get props');
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
	getInitialState: function() {
		return {
			confirmMessage: null
		};
	},
	render: function() {
		console.log('AtlasMaintainToolbar');
		console.log(this.props.selectedRecord);
		var canBeAdded = () => true && this.props.canBeAdded,
			canBeEdited = (record) => record !== null && this.props.canBeEdited,
			canBeDeleted = (record) => record !== null && this.props.canBeDeleted,

			onDelete = function (record) { 
				this.setState({
					confirmMessage: 'Are you sure?'
				});

				// if (confirm('Are you sure?')) {
				// 	this.props.onDelete(record);
				// } 
			};
		var confirmModal = this.state.confirmMessage? (<AtlasModal.Confirm 
																	onOK={this.onConfirm.bind(this, this.props.selectedRecord)}
																	onClose={this.onReject}>
																	{this.state.confirmMessage}
																	</AtlasModal.Confirm>): (<span />);
		
		return (<div className="btn-toolbar" role="toolbar" aria-label="toolbar">				
			  <button 	type="button" 
			  			className="btn btn-default" 
			  			onClick={this.props.onAdd.bind(this)}
			  			disabled={!canBeAdded()}>
			  		<i className="fa fa-plus-circle" style={{color:'green'}}/>&nbsp;
			  		<span>Add</span></button>
			  <button 	type="button"
			  			className="btn btn-default"
			  			onClick={this.props.onEdit.bind(this, copy(this.props.selectedRecord))}
			  			disabled={!canBeEdited(this.props.selectedRecord)} >
			  		<i className="fa fa-pencil"/>&nbsp;
			  		<span>Edit</span>
			  </button>
			  <button 	type="button" 
			  			className="btn btn-default" 
			  			onClick={onDelete.bind(this, copy(this.props.selectedRecord))}
			  			disabled={!canBeDeleted(this.props.selectedRecord)}>
			  		<i className="fa fa-trash-o" style={{color:'red'}}/>&nbsp;
			  		<span>Delete</span>
		  	   </button>

				{confirmModal}
			</div>);       
	},
	onConfirm: function(record) {
		this.props.onDelete(record);	
		this.setState({
			confirmMessage: null
		});
	},
	onReject: function() {
		this.setState({
			confirmMessage: null
		});
	}
});


export default AtlasMaintainToolbar;