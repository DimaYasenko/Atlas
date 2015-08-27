'use strict';
import adminApi from 'api/admin';
import adminStore from 'stores/admin';
import assign from 'object-assign';

console.log(adminStore);
function log() {
	console.log(arguments);
}
export default {
	getAdmins: function(params) {
		params = assign({page: 1, skip:0, pageSize: 10}, params);
		return adminApi.getAdmins(params)
				.then((v) => {	
					console.log('action');
					adminStore.set(assign({}, v, {page: params.page}));
					return v;
				});
	}, 
	createAdmin: function(admin, onSuccess, onFail) {
		var success = function(res) {
			if (onSuccess) onSuccess(res);
			return this.getAdmins();			
		}.bind(this);
		return adminApi.addAdmin(admin)
					.then(success, onFail)
					.catch(log);
	},
	editAdmin: function(admin, onSuccess, onFail) {
		var success = function(res) {
			if (onSuccess) onSuccess(res);
			return this.getAdmins();			
		}.bind(this);
		return adminApi.editAdmin(admin)
					.then(success, onFail)
					.catch(log);
	},
	deleteAdmin: function(id, onSuccess, onFail) {
		var success = function(res) {
			if (onSuccess) onSuccess(res);
			return this.getAdmins();			
		}.bind(this);

		return adminApi.deleteAdmin(id).
			then(success, onFail)
			.catch(log);
	},
	generatePassword: function() {
		
	}

};