'use strict';

/* Dependencies */

import React from 'react/addons';
import {Modal, Button, Input, ButtonInput, ButtonToolbar } from 'react-bootstrap';
import LoadMask from 'components/LoadMask';

require('styles/AtlasModal.css');

function doNothing() {}

var AtlasModal = React.createClass({
	propTypes: {
		title: React.PropTypes.any,
		onOK: React.PropTypes.func,
		onClose: React.PropTypes.func,
		loading: React.PropTypes.bool,
		invalid: React.PropTypes.bool,
		complexValidation: React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			title: '',
			onOK: doNothing,
			onClose: _ => true,
			loading: false,
			invalid: false,
			complexValidation: _ => true
		};
	},
	render: function() {
		var onClose = function() {
			if (this.props.loading) return false;
			return this.props.onClose();
		}.bind(this);	
		var onOK = function() {			
			return !this.props.complexValidation() && this.props.onOK();
		}.bind(this);

		var complexError = this.props.complexValidation();
		
		var errorBox = complexError? (<div className="alert alert-danger" role="alert">
										<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />&nbsp;
										{complexError}</div>)
													: (<div></div>);
				
		return (<Modal 	show={true}
						onHide={onClose}
						className="AtlasModal loading">
		                <Modal.Header closeButton>
		                  <Modal.Title>{this.props.title}</Modal.Title>
		                </Modal.Header>
		                <Modal.Body>
		                	
	                		{this.props.children}
	                		{errorBox}          		
	                		{this.props.loading? <LoadMask />: <span />}
		                	
		                </Modal.Body>
		                <Modal.Footer>
			                  <Button  	bsStyle='primary'
			                  			disabled={this.props.loading || this.props.invalid}
			                  			onClick={onOK}>OK</Button >
			                  <Button 	onClick={onClose}
			                  			disabled={this.props.loading}>Close</Button>
		                </Modal.Footer>
	            </Modal>);
	},
	statics: {
		confirm: function(onOK, title='Confirm', message='Are you sure?') {
			// var dialogContainer = document.body.appendChild(document.createElement('div'));
			// var onClose = function() {
			// 	React.render(<span/>, dialogContainer);
			// };

			// React.render(<AtlasModal 	title="WTF"
			// 							onClose={onClose}
			// 							onOK={onOK}>
			// 				<div className="alert alert-warning" role="alert"><i className="fa fa-exclamation-triangle" style={{fontSize: 'large'}} />&nbsp;{message}</div>
			// 			</AtlasModal>, dialogContainer);

		},		
		alert: function() {

		},
		Confirm: React.createClass({
			render: function() {
				return (<AtlasModal 	title="Confirm?"
										{...this.props}>
							<div className="alert alert-warning" role="alert"><i className="fa fa-exclamation-triangle" style={{fontSize: 'large'}} />&nbsp;{this.props.children}</div>
						</AtlasModal>);
			}
		})

	}	
});



module.exports = AtlasModal;
