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
		loading: React.PropTypes.bool
	},
	getDefaultProps: function() {
		return {
			title: '',
			onOK: doNothing,
			onClose: _ => true,
			loading: false
		};
	},
	render: function() {
		var onClose = function() {
			if (this.props.loading) return false;
			return this.props.onClose();
		}.bind(this);		
		return (<Modal 	show={true}
						onHide={onClose}
						className="AtlasModal loading">
		                <Modal.Header closeButton>
		                  <Modal.Title>{this.props.title}</Modal.Title>
		                </Modal.Header>
		                <Modal.Body>
		                	
	                		{this.props.children}
	                		{this.props.loading? <LoadMask />: <span />}
		                	
		                </Modal.Body>
		                <Modal.Footer>
			                  <Button  	bsStyle='primary'
			                  			disabled={this.props.loading}
			                  			onClick={this.props.onOK}>OK</Button >
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
