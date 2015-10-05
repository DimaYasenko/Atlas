'use strict';

import React from 'react';
import AtlasGrid from 'components/AtlasGrid';
import Flux from 'helpers/flux';
import AdminStore from 'stores/admin';
import UsersActions from 'actions/users';
import promises from 'helpers/promises';
import assign from 'object-assign';
import AtlasMaintainToolbar from 'components/AtlasMaintainToolbar';
import {Input} from 'react-bootstrap';
import AtlasModal from 'components/AtlasModal';

function getState(admins) {

	return admins;
}
//Monad?

var vRequired = function(value) {
	return value != '' || "Value is required";
};

var vNumber = function(value) {
	return Number.isFinite(+value) || "Value should be a number";
}

var vEmail = function(value) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email) || "Value should be a valid email";
}

var validatorMap = {
	login: [vRequired],
	email: [vRequired, vEmail]
};

var validators = {
	email: function(value) {
		if (value.length > 4) {
			return "Value should be less than 4";
		}
		return true;
	}
};

export default React.createClass({
	// mixins: [Flux.mixin([AdminStore], getState)],
	getInitialState: function() {
		UsersActions.getAdmins({
			page: 1,
			skip: 0,
			pageSize: 10
		});
		return {
			loading: true,
			modalLoading: false,
			count: 0,
			data: [],
			page: 1				
		};
	},
	update: function() {
		this.setState(assign({}, getState(AdminStore.get()), {loading: false}));
	},
	componentDidMount: function() {
		AdminStore.subscribe(this.update);
	},
	componentWilUnmount: function() {
		AdminStore.unSubscribe(this.update);
	},	
	render: function() {
		console.log("Admin Grid");

		var columns = [
	      {
	      	name: 'login'
	      },
	      {
	      	name: 'email'
	      }];

 		var closeAdd = this.changeVisibilityAddForm.bind(this, false),
	    	closeEdit = this.changeVisibilityEditForm.bind(this, false),
	    	showAdd = this.changeVisibilityAddForm.bind(this, true),
	    	showEdit = this.changeVisibilityEditForm.bind(this, true);

	    var errorState = forEachProp(this.state.selectedRecord, function(value, name, record) {
	    	// (validatorMap[name] || []).reduce(function(acc, next) { acc.push(next); return acc; } , [])
	    });

	    var errorMessage = function(p) {
		    	if (!this.state.selectedRecord) return;
		    	return validators[p] && validators[p](this.state.selectedRecord[p]) ;
		    }.bind(this),

		    validationStatus = function(p) {
	    		if (!this.state.selectedRecord) return;
				return errorMessage(p)? 'error': '';
		    }.bind(this);
		    

	
		var complexValidation = function() {	
			if (!this.state.selectedRecord) return;

			if (this.state.selectedRecord.email.length !== 3) return "Email's length should be equal 3";
			return false;

		}.bind(this),
			complexError = complexValidation();


		var props = ['email'];
		if (!!this.state.modalForm) {
			var errors = props.map(p => validationStatus(p) == 'error'),
			anyError = errors.some(a => !!a) || complexError;
			debugger;
		}
		
		var name = function(name) {
			return {				
				value: this.state.selectedRecord[name],
				onChange: function(e) {
					this.state.selectedRecord[name] = e.target.value;

					this.setState({
						selectedRecord: this.state.selectedRecord
					});
				}.bind(this),
				bsStyle: validationStatus(name),

				help: errorMessage(name)
			};
		}.bind(this);

	    var fillForm = !!this.state.modalForm ? (<div>
	    									<Input  type="text"
													label={<span><span style={{color: 'red'}}>*&nbsp;</span>Login</span>}
													{...name('login')}/>

											{this.state.modalForm === 'add' ? (<Input  type="password"
													label="Password"
													hidden={this.state.modalForm === 'edit'}
													value={this.state.selectedRecord.password}													
													onChange={this.onChange.bind(this, 'password')}/>)
												: (<span />) }
															
											<Input  type="text"
													label="Email"	
													{...name('email')}			
													/>
											
				                    </div>): (<span />),

			addModalForm =  this.state.modalForm === 'add'? 
								(<AtlasModal title="Add Admin"
											onClose={closeAdd}											
											loading={this.state.modalLoading}
											invalid={anyError}
											complexError={complexError}
											onOK={this.onAddAdmin.bind(this, this.state.selectedRecord)}>								
											{fillForm}											
								</AtlasModal>): (<span/>),

			editModalForm = this.state.modalForm === 'edit'? 
							(<AtlasModal 	title="Edit Admin"
											loading={this.state.modalLoading}
											invalid={anyError}
											complexError={complexError}											
											onClose={closeEdit}
											onOK={this.onEditAdmin.bind(this, this.state.selectedRecord)}>
								{fillForm}								
							</AtlasModal>
				            ): (<span />),

			bottomToolBar = (
							<AtlasMaintainToolbar  	onAdd={showAdd} 
                                                  	onEdit={showEdit}
                                                  	onDelete={this.onDeleteAdmin}
                                                  	canBeDeleted={ (r) => true}
                                                  	/>
                                                       
			);


		return (<div>
			<AtlasGrid  idProperty="id"
						ref="grid"
						title="Admins"
						loading={this.state.loading}				
						page={this.state.page}
						totalCount={this.state.count}
			            dataSource={this.state.data}
			            columns={columns}
			            style={{margin: 10}}
			            onPageChange={this.onPageChange}
			            onRefresh={this.onRefresh}
			            bottomToolBar={bottomToolBar}			            
			            />
             	{addModalForm}
                {editModalForm}
            </div>
		);
	},
	changeVisibilityAddForm: function(show) {
		this.setState({
			modalForm: show? 'add': null,
			selectedRecord: show? {}: null
		});
	},
	changeVisibilityEditForm: function(show, selectedRecord) {
		this.setState({
			modalForm: show? 'edit': null, 
			selectedRecord: show? selectedRecord: null
		});
	},
	onChange: function(prop, e) {
		
		
	},
	onAddAdmin: function(selected) {

		this.setState({
			modalLoading: true
		});

		UsersActions.createAdmin({
			login: selected.login,
			password: selected.password,
			email: selected.email
		}, this.onSuccess);

	},
	onSuccess: function() {
		this.setState({ 
			modalForm: null,
			modalLoading: false,
			loading: true,
			selectedRecord: null,
		});
	},
	onEditAdmin: function(selected) {
		this.setState({
			modalLoading: true
		});
		UsersActions.editAdmin({
			id: selected.id,
			login: selected.login,
			password: selected.password,
			email: selected.email
		}, this.onSuccess);		
	},
	onDeleteAdmin: function(selected) {
		debugger;
		UsersActions.deleteAdmin(selected.id, this.onSuccess);
	},
	onPageChange: function(page) {
		UsersActions.getAdmins({
			page: page,
			skip: (page - 1) * 10,
			pageSize: 10
		});
		this.setState({			
			loading: true
		});
	},
	onRefresh: function() {
		this.onPageChange(this.state.page);
	}
});