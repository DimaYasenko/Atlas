/**
 * Pivot Actions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PivotConstants = require('../constants/PivotConstants');

var PivotActions = {

  /**
   * @param  {string} mode
   */
  changeMode: function(mode) {
    AppDispatcher.handleViewAction({
      actionType: PivotConstants.CHANGE_MODE,
      mode: mode
    });    
  }

};

module.exports = PivotActions;