var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PivotConstants = require('../constants/PivotConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _state = {
  mode: 'oneByOne',
  jobs: ['Job1', 'Job2']
};

var PivotStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _state;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var mode;

    switch(action.actionType) {
      case PivotConstants.CHANGE_MODE:
        mode = payload.action.mode;
        if (['board', 'oneByOne', 'list'].indexOf(mode) >= 0) {
          console.log(mode);

          _state.mode = mode;
          PivotStore.emitChange();
        }
        break;

      // case PivotConstants.CHANGE_BOARD:
      //   destroy(action.id);
      //   PivotStore.emitChange();
      //   break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = PivotStore;
