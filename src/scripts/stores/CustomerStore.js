'use strict';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import CustomerConstants from '../constants/CustomerConstants';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';


let state = {  
  customers: []
};

const CustomerStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll () {
    return state;
  },

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: AppDispatcher.register(function(payload) {
  	let action = payload.action;
    if (CustomerStore[action.actionType]) {
    	CustomerStore[action.actionType](action);
    }
    // switch(action.actionType) {
    //   	case CustomerConstants.LOAD_CUSTOMERS:
    //    	let data = action.data;
    //    	state.customers = data;

    // 	break;
    // }
	CustomerStore.emitChange();

    return true; // No errors. Needed by promise in Dispatcher.
  })
});


CustomerStore[CustomerConstants.LOAD_CUSTOMERS] = function(action) {
	state.customers = action.data;
};


module.exports = CustomerStore;
