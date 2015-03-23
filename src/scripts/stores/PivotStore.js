'use strict';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import PivotConstants from '../constants/PivotConstants';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';


let _state = {  
  jobs: [],
  wellbores: []
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
    let mode = action.mode;
    switch(action.actionType) {
      case PivotConstants.VIEW_JOB:
        let { jobs, jobDetail } = payload.action;
        if (mode === 'board') {
          _state.jobs = jobs;
          PivotStore.emitChange();
        }

        if (mode === 'oneByOne') {
          _state.jobs = jobs;
          _state.jobDetail = jobDetail;
          PivotStore.emitChange();
        }
        break;

    case PivotConstants.VIEW_WELLBORE:
        console.log('wellbore');
        let { wellbores, wellboreDetail } = payload.action;
        if (mode === 'board') {
          _state.wellbores = wellbores;
          PivotStore.emitChange();
        }

        if (mode === 'oneByOne') {
          _state.wellbores = wellbores;
          _state.wellbores = wellbores;
        }
        break;

    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = PivotStore;
