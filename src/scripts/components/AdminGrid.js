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

	    var fillForm = !!this.state.modalForm ? (<div>
	    									<Input  type="text"
													label="Login"
													disabled={this.state.modalForm === 'edit'}
													value={this.state.selectedRecord.login}
													onChange={this.onChange.bind(this, 'login')}/>

											{this.state.modalForm === 'add' ? (<Input  type="password"
													label="Password"
													hidden={this.state.modalForm === 'edit'}
													value={this.state.selectedRecord.password}
													onChange={this.onChange.bind(this, 'password')}/>)
												: (<span />) }
															
											<Input  type="text"
													label="Email"
													value={this.state.selectedRecord.email}
													onChange={this.onChange.bind(this, 'email')}/>
											
				                    </div>): (<span />),

			addModalForm =  this.state.modalForm === 'add'? 
								(<AtlasModal title="Add Admin"
											onClose={closeAdd}
											loading={this.state.modalLoading}
											onOK={this.onAddAdmin.bind(this, this.state.selectedRecord)}>								
											{fillForm}
											<div className="alert alert-danger" role="alert">
												<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
												Timeout. Please retry</div>
								</AtlasModal>): (<span/>),

			editModalForm = this.state.modalForm === 'edit'? 
							(<AtlasModal 	title="Edit Admin"
											loading={this.state.modalLoading}
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
		this.state.selectedRecord[prop] = e.target.value;

		this.setState({
			selectedRecord: this.state.selectedRecord
		});
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
		// data = data.filter(d => d.id !== selected.id);
		// this.refs.grid.reload();
		// this.setState({
		// 	modalForm: null,
		// 	selectedRecord: null
		// });

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