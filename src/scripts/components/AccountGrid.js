'use strict';


/* Dependencies */
import React from 'react/addons';

import AtlasGrid from 'components/AtlasGrid';

import AtlasMaintainToolbar from 'components/AtlasMaintainToolbar';
import AtlasModal from 'components/AtlasModal';

import promises from '../helpers/promises';
import {Modal, Button, Input, ButtonInput, ButtonToolbar } from 'react-bootstrap';

var data = [];
    for (var i = 0; i < 30; i++) {
      data.push({
      	id: i,
        login: 'User ' + i,
        email: 'Email ' + i,
        locked: Math.random() * 10 > 5        
      });
    }

function getData(params) {      
      return promises
              .delay(1500)
              .then(() => { return {count: data.length, data: data.slice(params.skip, params.skip + params.pageSize)};});
}


function  doNothing() {}


var AccountGrid = React.createClass({
	getInitialState: function() {	
		return {
			modalForm: null,
			selectedRecord: null
		};
	},
	render: function () {

		var columns = [
	      // {
	      //   name: 'id',
	      //   width: 50
	      // },
	      {
	      	name: 'login'
	      },
	      {
	      	name: 'email'
	      },
	      {
	        name: 'locked',
	        render: (value, data) => value? 'Y': 'N'
	      }];   

	    var closeAdd = this.changeVisibilityAddForm.bind(this, false),
	    	closeEdit = this.changeVisibilityEditForm.bind(this, false),
	    	showAdd = this.changeVisibilityAddForm.bind(this, true),
	    	showEdit = this.changeVisibilityEditForm.bind(this, true);

	    var fillForm = !!this.state.modalForm ? (<div>
	    									<Input  type="text"
													label="Login"
													value={this.state.selectedRecord.login}
													onChange={this.onChange.bind(this, 'login')}/>

											<Input  type="text"
													label="Email"
													value={this.state.selectedRecord.email}
													onChange={this.onChange.bind(this, 'email')}/>

											<Input  type="checkbox"
													label="Locked"
													checked={this.state.selectedRecord.locked}
													onChange={this.onCheckboxChange.bind(this, 'locked')}/>
				                    </div>): (<span />),

			addModalForm =  this.state.modalForm === 'add'? 
								(<AtlasModal title="Add User"
											onClose={closeAdd}
											onOK={this.onAddAccount.bind(this, this.state.selectedRecord)}>								
											{fillForm}
								</AtlasModal>): (<span/>),

			editModalForm = this.state.modalForm === 'edit'? 
							(<AtlasModal 	title="Edit User"
											onClose={closeEdit}
											onOK={this.onEditAccount.bind(this, this.state.selectedRecord)}>
								{fillForm}
							</AtlasModal>
				            ): (<span />),

			bottomToolBar = (<AtlasMaintainToolbar  onAdd={showAdd} 
                                                  	onEdit={showEdit}
                                                  	onDelete={this.onDeleteAccount}
                                                  	canBeDeleted={ (r) => true}/>);


		return (<div>
					<AtlasGrid 	
								ref="grid"
								idProperty='id'
					            title="Accounts"
					            dataSource={getData}
					            columns={columns}
					            style={{margin: 10}}
					            bottomToolBar={bottomToolBar}/>
			       	{addModalForm}
			       	{editModalForm}
		        </div>);
    
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
	onCheckboxChange: function(prop, e) {
		
		this.state.selectedRecord[prop] = e.target.checked;

		this.setState({
			selectedRecord: this.state.selectedRecord
		});
	},
	onAddAccount: function(selected) {
		selected.id = data[data.length - 1].id + 1;
		data.push(selected);
		this.setState({ 
			modalForm: null,
			selectedRecord: null,
		});
		this.refs.grid.reload();
	},
	onEditAccount: function(selected) {
		data = data.map(d => d.id !== selected.id? d: {
			id: selected.id,
			login: selected.login,
			email: selected.email,
			locked: selected.locked
		});

		this.setState({ 
			modalForm: null,
			selectedRecord: null,
		});
		this.refs.grid.reload();
	},
	onDeleteAccount: function(selected) {
		data = data.filter(d => d.id !== selected.id);
		this.refs.grid.reload();
		this.setState({
			modalForm: null,
			selectedRecord: null
		});

	}
});



module.exports = AccountGrid;