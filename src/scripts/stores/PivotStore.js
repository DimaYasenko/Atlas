'use strict';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import PivotConstants from '../constants/PivotConstants';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';


let _state = {
  mode: 'oneByOne',
  jobs: ['Job1', 'Job2']
};

const PivotStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll () {
    return _state;
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

    switch(action.actionType) {
      case PivotConstants.CHANGE_MODE:
        let mode = payload.action.mode;
        if (['board', 'oneByOne', 'list'].indexOf(mode) >= 0) {

          _state.mode = mode;
          PivotStore.emitChange();
        }
        break;


    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = PivotStore;
