'use strict';
/**
 * Pivot Actions
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import { delay }  from '../helpers/promises';
import CustomerConstants from '../constants/CustomerConstants';


function doNothing() {}

let customers = [{
	id: 0,
	name: 'Вася',
	lastName: 'Пупкин',
	age: 18
}];

const CustomerActions = {
	loadCustomers() {
		delay(3000).then(function() {
			AppDispatcher.handleViewAction({
		  		actionType: CustomerConstants.LOAD_CUSTOMERS,
		  		data: customers
		  	});
		});
	}
};

module.exports = CustomerActions;