'use strict';

import React from 'react/addons';

import AtlasModal from '../../components/AtlasModal';




function doNothing() {}
function always() { return true;}
function copy (obj) {
	var cpy = {};
	for (var i in obj) {
		cpy[i] = obj[i];
	}
	return cpy;
}

export default React.createClass({	
	propTypes: {
		onAdd: React.PropTypes.func,
		onEdit: React.PropTypes.func,
		onDelete: React.PropTypes.func,
		onReset: React.PropTypes.func,

		canBeAdded: React.PropTypes.bool,
		canBeEdited: React.PropTypes.bool,
		canBeDeleted: React.PropTypes.bool,		
		canBeRefreshed: React.PropTypes.bool		
	},

	getInitialState: function() {
		return {
			confirmMessage: null,
			func: doNothing
		};
	},

	getDefaultProps: function() {
		var self = this;
		return {
			onAdd: doNothing,
			onEdit: doNothing,
			onDelete: doNothing,
			onReset: doNothing,

			canBeRefreshed: false,
			canBeAdded: true,
			canBeEdited: false,
			canBeDeleted: false,
		};
	},


	render() {
		
			var onDelete =  (record) => { 
				this.setState({
					confirmMessage: 'Are you sure?',
					func: this.props.onDelete
				})
			},

			onReset = () => {
				this.setState({
					confirmMessage: 'Are you sure?',
					func: this.props.onReset
				})
			};	

			var confirmModal = this.state.confirmMessage? (<AtlasModal.Confirm 
																		onOK={this.onConfirm.bind(this, this.state.func)}
																		onClose={this.onReject}>
																		{this.state.confirmMessage}
																		</AtlasModal.Confirm>): (<span />);			
			
			return (
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="btn-toolbar" role="toolbar" aria-label="toolbar">				
						  <button 	type="button" 
						  			className="btn btn-default" 
						  			onClick={this.props.onAdd.bind(this)}
						  			disabled={!this.props.canBeAdded}>
						  		<i className="fa fa-plus-circle" style={{color:'green'}}/>&nbsp;
						  		<span>Add</span></button>
						  <button 	type="button"
						  			className="btn btn-default"
						  			onClick={this.props.onEdit}
						  			disabled={!this.props.canBeEdited} >
						  		<i className="fa fa-pencil"/>&nbsp;
						  		<span>Edit</span>
						  </button>
						  <button 	type="button" 
						  			className="btn btn-default" 
						  			onClick={onDelete}
						  			disabled={!this.props.canBeDeleted}>
						  		<i className="fa fa-trash-o" style={{color:'red'}}/>&nbsp;
						  		<span>Delete</span>
					  	   </button>
						  <button 	type="button" 
						  			className="btn btn-default" 
						  			onClick={onReset}
						  			disabled={!this.props.canBeRefreshed}>
						  		<i className="fa fa-cogs" style={{color:'blue'}}/>&nbsp;
						  		<span>Reset Password</span>
					  	   </button>
						</div>
					</div>
				

					{confirmModal}
				</div>

				);       
		},
		onConfirm: function(func) {
			func();	
			this.setState({
				confirmMessage: null,
				func: doNothing
			});
		},
		onReject: function() {
			this.setState({
				confirmMessage: null
			});
		}	
});