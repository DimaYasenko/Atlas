'use strict';

import promises from 'helpers/promises';
import assign from 'object-assign';

var str = localStorage.getItem('admins');
var json = str || JSON.parse(str);

var admins = json || [{
	id: 0,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 1,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 2,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 3,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 4,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 5,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 6,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 10,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 20,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 30,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 40,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 50,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 60,
	login: 'root',
	email: 'root@gmail.com'
},{
	id: 70,
	login: 'root',
	email: 'root@gmail.com'
}];

function success() {
	return {
		status: 'OK',
		errorMessage: ''
	};
}
export default {
	getAdmins: function(params) 	{
		return promises.delay(1000)
						.then( _ => {

							return {
								data: admins.slice(params.skip, params.skip + params.pageSize),
								count: admins.length};
							}
						);
	},
	addAdmin: function(admin) {
		return promises.delay(2000)
						.then(_ => {
							debugger;
							admins.push(assign({ }, {id: admins[admins.length - 1].id + 1}, admin));
						})
						.then(success);
	},
	editAdmin: function(admin) {
		debugger;
		return promises.delay(2000)
						.then(_ => {
							admins = admins.map(d => d.id !== admin.id? d: {
								id: admin.id,
								login: admin.login,
								email: admin.email,
								locked: admin.locked
							});
						})
						.then(success);
	}
};