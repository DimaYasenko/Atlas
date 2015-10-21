'use strict';

/* Dependencies */
import React from 'react/addons';

import RequestsGrid from '../Dumb/RequestsGrid';
import {range} from '../../helpers/func';
import AdminsForm from '../Dumb/AdminsForm';
import RequestsToolbar from '../Dumb/RequestsToolbar';
import requestService from '../../api/requestService';
import LoadMask from '../LoadMask';
import AtlasModal from '../AtlasModal';


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
	mixins: [gridMixin('selectedRequestId', 'selectedRequest')],
	getInitialState() {
		var page = 1;
		this.synchWithServer(page)
		return {
				loading: true,
				data: [],
				page: page,
				totalCount: 0,
				visibleForm: false,
				selectedRequestId: null,
				formType: null,
				errors: false,
				successWindow: false
		};
	},
	render() {

		var formRecord = (this.state.formType == 'edit')? this.state.selectedRequest: null;
		
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
							<RequestsGrid 
									data={this.state.data}
									page={this.state.page}
									totalCount={this.state.totalCount}		
									onPageChange={this.onPageChanged}							
									onRefresh={this.onPageChanged.bind(this, this.state.page)}							
									/>

							{
								!!this.state.formType && (<AdminsForm {...formRecord}						
										onSubmit={this.onTenansAdded}
										onClose={this.onCloseForm}
										formMode={this.state.formType}
										visible={!!this.state.formType} 
										errors={this.state.errors}
										loading={this.state.loading}/>)

							}
							
							<RequestsToolbar  	canBeAccepted={this.state.selectedRequestId != null}
												canBeRejected={this.state.selectedRequestId != null}
												canBeSend={this.state.selectedRequestId != null}
												
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
			requestService.addTenant(tenant).then(function(d) {
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
			requestService.updateTenant(tenant).then(this.synchWithServer.bind(this, this.state.page));			
			
		}
		
	},
	onTenantDelete() {
		this.setState({
			loading: true
		});
		requestService.deleteTenant(this.state.selectedRequestId)
			.then(this.synchWithServer.bind(this, this.state.page))
		
	},
	onTenantAdd () {
		this.setState({ formType: 'add'});
	},
	onResetPassword () {
		requestService.resetPassword(this.state.selectedRequestId)
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
		requestService.getRequests(page).then(d => {
			this.setState({
				selectedRequestId: null,
				selectedRequest: null,
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


