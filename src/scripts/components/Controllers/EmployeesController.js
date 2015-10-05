'use strict';

/* Dependencies */
import React from 'react/addons';

import EmployeesGrid from '../Dumb/EmployeesGrid';
import {range} from '../../helpers/func';
import EmployeesForm from '../Dumb/EmployeesForm';
import AdminsToolbar from '../Dumb/AdminsToolbar';
import adminService from '../../api/tenantService';
import LoadMask from '../LoadMask';
import AtlasModal from '../AtlasModal';


async function test() {

}
var gridMixin = function (fieldName, recordFieldName) {
	return {
		childContextTypes: {
			onSelectionChange: React.PropTypes.func,
			selected: React.PropTypes.any
		},
		getChildContext () {	
			var self = this;		
			return {
				onSelectionChange: function(newSelectedId, data) {
					
				    self.setState({
				    	[fieldName]: newSelectedId, 
				    	[recordFieldName]: newSelectedId === null? null: data
				    });
				},
				selected: self.state[fieldName]
			};
		}
	};
};

export default React.createClass({
	mixins: [gridMixin('selectedEmployeeId', 'selectedEmployee')],
	getInitialState() {
		var page = 1;
		this.synchWithServer(page)
		return {
				loading: true,
				data: [],
				page: page,
				totalCount: 0,
				visibleForm: false,
				selectedEmployeeId: null,
				formType: null,
				errors: false,
				successWindow: false
		};
	},
	render() {

		var formRecord = (this.state.formType == 'edit')? this.state.selectedEmployee: null;
		
		return (
			<div>				
					{this.state.loading &&(<LoadMask/>)}
					{this.state.successWindow && (<AtlasModal.Success 
						onClose={this.onSuccessClose} 
						onOK={this.onSuccessClose}>
						<span>Passwrod has been reset</span>
						</AtlasModal.Success>)}
					<div className="panel panel-default">
						<div className="panel-body">
							<EmployeesGrid 
									data={this.state.data}
									page={this.state.page}
									totalCount={this.state.totalCount}		
									onPageChange={this.onPageChanged}							
									onRefresh={this.onPageChanged.bind(this, this.state.page)}							
									/>

							{
								!!this.state.formType && (<EmployeesForm {...formRecord}						
										onSubmit={this.onTenansAdded}
										onClose={this.onCloseForm}
										formMode={this.state.formType}
										visible={!!this.state.formType} 
										errors={this.state.errors}
										loading={this.state.loading}/>)

							}
							
							<AdminsToolbar  	canBeEdited={this.state.selectedEmployeeId != null}
												canBeDeleted={this.state.selectedEmployeeId != null}
												canBeRefreshed={this.state.selectedEmployeeId != null}
												onDelete={this.onTenantDelete}
												onAdd={this.onTenantAdd}
												onEdit={this.onTenantEdit}
												onReset={this.onResetPassword}
								/>
						</div>
						
							
					</div>

			</div>
		);
	},
	onTenansAdded(tenant) {
		this.setState({ loading: true });
		if (this.state.formType == 'add') {
			// 
			adminService.addTenant(tenant).then(function(d) {
				if (d.status == 'FAIL') {
					this.setState({
						errors: d.errors,
						loading: false,
						// formType: null
					});
				}
				if (d.status == 'OK') {
					this.synchWithServer.bind(this, this.state.page);

				}
			}.bind(this));			
		}

		if (this.state.formType == 'edit') {
			adminService.updateTenant(tenant).then(this.synchWithServer.bind(this, this.state.page));			
			
		}
		
	},
	onTenantDelete() {
		this.setState({
			loading: true
		});
		adminService.deleteTenant(this.state.selectedEmployeeId)
			.then(this.synchWithServer.bind(this, this.state.page))
		
	},
	onTenantAdd () {
		this.setState({ formType: 'add'});
	},
	onResetPassword () {
		adminService.resetPassword(this.state.selectedEmployeeId)
			.then(() => {
				this.setState({
					successWindow: true
				})
			})
	},
	onSuccessClose () {
		this.setState({
			successWindow: false
		});
	},
	onCloseForm () {
		this.setState({			
			formType: null,
			errors: false
		})
	},
	onTenantEdit() {
		this.setState({
			formType: 'edit'
		})
	},
	onPageChanged(page) {
		this.synchWithServer(page);
	},
	synchWithServer (page) {

		this.setState({
			loading: true
		});
		adminService.getTenants(page).then(d => {
			this.setState({
				selectedEmployeeId: null,
				selectedEmployee: null,
				data: d.data,
				page: page,
				totalCount: d.count,
				loading: false,
				errors: false,
				formType: null

			});
		})
	}
});


