'use strict';

/* Dependencies */
import React from 'react/addons';

import TenantsGrid from '../Dumb/TenantsGrid';
import {range} from '../../helpers/func';
import TenantsForm from '../Dumb/TenantsForm';
import TenantsToolbar from '../Dumb/TenantsToolbar';
import tenantService from '../../api/tenantService';
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
	mixins: [gridMixin('selectedTenantId', 'selectedTenant')],
	getInitialState() {
		var page = 1;
		this.synchWithServer(page)
		return {
				loading: true,
				data: [],
				page: page,
				totalCount: 0,
				visibleForm: false,
				selectedTenantId: null,
				formType: null,
				errors: false,
				successWindow: false
		};
	},
	render() {

		var formRecord = (this.state.formType == 'edit')? this.state.selectedTenant: null;
		
		return (
			<div>				
					{this.state.loading &&(<LoadMask/>)}
					{this.state.successWindow && (<AtlasModal.Success 
						onClose={this.onSuccessClose} 
						onOK={this.onSuccessClose}>
						<span>Passwrod has been reset</span>
						</AtlasModal.Success>)}
					<TenantsGrid 
							data={this.state.data}
							page={this.state.page}
							totalCount={this.state.totalCount}		
							onPageChange={this.onPageChanged}							
							onRefresh={this.onPageChanged.bind(this, this.state.page)}							
							/>

					{
						!!this.state.formType && (<TenantsForm {...formRecord}						
								onSubmit={this.onTenansAdded}
								onClose={this.onCloseForm}
								formMode={this.state.formType}
								visible={!!this.state.formType} 
								errors={this.state.errors}
								loading={this.state.loading}/>)

					}
					<TenantsToolbar canBeEdited={this.state.selectedTenantId != null}
									canBeDeleted={this.state.selectedTenantId != null}
									canBeRefreshed={this.state.selectedTenantId != null}
									onDelete={this.onTenantDelete}
									onAdd={this.onTenantAdd}
									onEdit={this.onTenantEdit}
									onReset={this.onResetPassword}
					/>

			</div>
		);
	},
	onTenansAdded(tenant) {
		this.setState({ loading: true });
		if (this.state.formType == 'add') {
			// 
			tenantService.addTenant(tenant).then(function(d) {
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
			tenantService.updateTenant(tenant).then(this.synchWithServer.bind(this, this.state.page));			
			
		}
		
	},
	onTenantDelete() {
		this.setState({
			loading: true
		});
		tenantService.deleteTenant(this.state.selectedTenantId)
			.then(this.synchWithServer.bind(this, this.state.page))
		
	},
	onTenantAdd () {
		this.setState({ formType: 'add'});
	},
	onResetPassword () {
		tenantService.resetPassword(this.state.selectedTenantId)
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
		tenantService.getTenants(page).then(d => {
			this.setState({
				selectedTenantId: null,
				selectedTenant: null,
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


