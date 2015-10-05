'use strict';

import promises from 'helpers/promises';
import assign from 'object-assign';
import {range} from '../helpers/func';


var tenants =  range(0, 30).map(d => ({
					id: d.toString(),
					name: 'Vasa ' + d,
					login: 'vasa',
					email: 'some-email@test.com',
					locked: Math.random() > 0.5? true: false,
					exp: new Date()
				}));


var api = {
	getTenants: function(page) {
		return promises.delay(1000)
			.then(_ => ({data: tenants.slice((page - 1) * 10, page * 10), count:tenants.length}))
		// .then(_ => { return {data: tenants, count.tenants.length}});
	},
	deleteTenant(id) {
		return promises.delay(1000)
			.then(_ => {
				tenants = tenants.filter(t => t.id != id);
				return { status: 'OK' }}
				);
	},
	addTenant(tenant) {
		return promises.delay(1000)
			.then(_ => {
				tenant.id = tenants.length.toString();
				tenants.push(tenant);
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
						tenants = tenants.map(t => t.id == tenant.id? tenant: t);						
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