"use strict";
import React from 'react/addons';

import {Input} from 'react-bootstrap';
import AtlasModal from '../../components/AtlasModal';


function validateEmail(email) {
   
}


function toDate() {

}

function fromDate(d) {
	if (!d) return '';
	return 1900 + d.getYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
}

const AdminsForm = React.createClass({
	getInitialState() {
		return {
			record: {...this.props},
			errorCauseValues: {}		
		};
	},
	propTypes: {
	
	// 	tenant: React.PropTypes.shape({
	      id: React.PropTypes.string,
	      login: React.PropTypes.string,
	      email: React.PropTypes.string,
	      onSubmit: React.PropTypes.func,
	      onClose: React.PropTypes.func,
	      formMode: React.PropTypes.string

	    // })
	},
	getDefaultProps() {
		return {
			onSubmit: (d) => { console.log(d)},
			onClose: (d) => {console.log(d);},
			formMode: 'add',
			errors: null
		}
	},
	render() {
		var required = function(nm, text = "Required") {
			return !this.state.record[nm]?text: null;
			
		}.bind(this);

		var email = function (nm, text = "Email is not valid") {
			 var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	
    		return !re.test(this.state.record[nm])? text: '';
		}.bind(this);

		var serverErrors = this.props.errors;

		var clientErrors = {
			email: email('email'),
			login: required('login')
		};

		var allErrors = {}, 
			invalid = false;

		for (var prop in clientErrors) {

			if (clientErrors[prop]) {
				!allErrors[prop]  && (allErrors[prop] = [])
				allErrors[prop].push(clientErrors[prop]);
				invalid = true;
			} 			
			
		}

		for (var prop in serverErrors) {

			if (this.state.errorCauseValues && this.state.errorCauseValues[prop] != this.state.record[prop]) continue;
			if (serverErrors[prop]) {
				!allErrors[prop]  && (allErrors[prop] = [])
				allErrors[prop].push(serverErrors[prop]);
			} 			
			
		}

		var validation = {};
		for (var prop in allErrors) {
			console.log(allErrors[prop])
			validation[prop] = {
				bsStyle: allErrors[prop].length? 'error': '',
				help: allErrors[prop].join('. ')				
			}
			
		}

		console.log(validation);

		return (<AtlasModal title="Admins"
							onOK={this.onSubmit}
							onClose={this.props.onClose}
							visible={this.props.visible}
							invalid={invalid}
							loading={this.props.loading}>
			<div>
				<Input  label=""
						type="hidden"
						ref="id"
						value={this.props.id}												
						/>

				<Input  label="Login"
						type="text"
						ref="login"
						disabled={this.props.formMode == 'edit'}
						value={this.state.record.login}						
						onChange={this.onRecordChanged.bind(this,'login')}	
						{...validation.login}
						/>

				<Input  label="Email"
						type="text"
						ref="email"
						value={this.state.record.email}
						onChange={this.onRecordChanged.bind(this, 'email')}
						{...validation.email}
						/>			
			</div>
        </AtlasModal>);
	},

	onRecordChanged (nm, e) {
		this.state.record[nm] = e.target.type == 'checkbox'? e.target.checked: e.target.value;
		this.setState({
			record: this.state.record
		});
	},
	onSubmit(e) {
		this.setState({
			errorCauseValues: {...this.state.record}
		});
		this.props.onSubmit(this.state.record);		
	}
});

module.exports = AdminsForm;