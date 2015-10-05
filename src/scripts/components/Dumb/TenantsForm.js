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

const TenantsForm = React.createClass({
	getInitialState() {
		console.log('initial')
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
	      name: React.PropTypes.string,
	      locked: React.PropTypes.bool,
	      exp: React.PropTypes.instanceOf(Date),
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
			login: required('login'),
			name: required('name')
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

		console.log(this.state.errorCauseValues);
		for (var prop in serverErrors) {

			if (this.state.errorCauseValues && this.state.errorCauseValues[prop] != this.state.record[prop]) continue;
			if (serverErrors[prop]) {
				!allErrors[prop]  && (allErrors[prop] = [])
				allErrors[prop].push(serverErrors[prop]);
			} 			
			
		}
		console.log(allErrors);

		var validation = {};
		for (var prop in allErrors) {
			console.log(allErrors[prop])
			validation[prop] = {
				bsStyle: allErrors[prop].length? 'error': '',
				help: allErrors[prop].join('. ')				
			}
			
		}

		console.log(validation);

		return (<AtlasModal title="Tenants"
							onOK={this.onSubmit}
							onClose={this.props.onClose}
							visible={this.props.visible}
							invalid={invalid}
							loading={this.props.loading}>

							<Input  label=""
							type="hidden"
							ref="id"
							value={this.props.id}												
							/>

			<div className="row">
				<div className="col-md-6">

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


				<Input  label="Name"
						type="text"
						ref="name"
						value={this.state.record.name}
						onChange={this.onRecordChanged.bind(this, 'name')}
						{...validation.name}
						/>

				</div>

				<div className="col-md-6">
					

					<Input  label="Expiration Date"
							ref="exp"
							type="text"
							value={fromDate(this.state.record.exp)}
							onChange={this.onRecordChanged.bind(this, 'exp')}

							/>

					<Input  label="Locked"
						ref="locked"
						type="checkbox"						
						checked={this.state.record.locked}
						onChange={this.onRecordChanged.bind(this, 'locked')}

						/>
				</div>
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

module.exports = TenantsForm;