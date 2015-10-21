'use strict';

import promises from 'helpers/promises';
import assign from 'object-assign';
import {range} from '../helpers/func';


var requests =  range(0, 30).map(d => ({
					id: d.toString(),
					name: 'Vasa ' + d,
					login: 'vasa',
					companyName: 'company ' + d,
					email: 'some-email@test.com',
					status: 'pending'					
				}));


var api = {
	getRequests: function(page) {
		return promises.delay(1000)
			.then(_ => ({data: requests.slice((page - 1) * 10, page * 10), count:requests.length}))
		// .then(_ => { return {data: requests, count.requests.length}});
	},
	deleteTenant(id) {
		return promises.delay(1000)
			.then(_ => {
				requests = requests.filter(t => t.id != id);
				return { status: 'OK' }}
				);
	},
	addTenant(tenant) {
		return promises.delay(1000)
			.then(_ => {
				tenant.id = requests.length.toString();
				requests.push(tenant);
				return {
					status: 'FAIL', 
					errors: {
						login: 'Login is already used',
						email: 'Email is already used'
					}
				};
			});
	},
	updateTenant(tenant) {
		return promises.delay(1000)
					.then(_ => {
						debugger;
						requests = requests.map(t => t.id == tenant.id? tenant: t);						
						return {status: 'OK'}
					});
	},
	resetPassword() {
		return promises.delay(1000)
				.then(_ => {
					return {status: 'OK'}
				});
			
	}
}

module.exports = api;