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
			onReject: doNothing,
			onAccept: doNothing,
			onSend: doNothing,
			
			canBeRejected: false,
			canBeAccepted: false,
			canBeSend: false			
		};
	},


	render() {
		
			var onReject =  (record) => { 
				this.setState({
					confirmMessage: 'Are you sure?',
					func: this.props.onReject
				})
			},

			onAccept = () => {
				this.setState({
					confirmMessage: 'Are you sure?',
					func: this.props.onAccept
				})
			};	

			var confirmModal = this.state.confirmMessage? (<AtlasModal.Confirm 
																		onOK={this.onConfirm.bind(this, this.state.func)}
																		onClose={this.onRejectConfirm}>
																		{this.state.confirmMessage}
																		</AtlasModal.Confirm>): (<span />);			
			
			return (
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="btn-toolbar" role="toolbar" aria-label="toolbar">				
						  <button 	type="button" 
						  			className="btn btn-default" 
						  			onClick={onAccept}
						  			disabled={!this.props.canBeAccepted}>
						  		<i className="fa fa-plus-circle" style={{color:'green'}}/>&nbsp;
						  		<span>Accept</span></button>

						

						  <button 	type="button" 
						  			className="btn btn-default" 
						  			onClick={onReject}
						  			disabled={!this.props.canBeRejected}>
						  		<i className="fa fa-trash-o" style={{color:'red'}}/>&nbsp;
						  		<span>Reject</span>
					  	   </button>

					  	     <button type="button"
						  			className="btn btn-default"
						  			onClick={this.props.onEdit}
						  			disabled={!this.props.canBeSend} >
						  		<i className="fa fa-envelope-o"/>&nbsp;
						  		<span>Send</span>
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
		onRejectConfirm: function() {
			this.setState({
				confirmMessage: null,
				func: doNothing
			});
		}	
});