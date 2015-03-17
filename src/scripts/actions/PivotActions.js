'use strict';
/**
 * Pivot Actions
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import PivotConstants from '../constants/PivotConstants';

const PivotActions = {

  /**
   * @param  {string} mode
   */
  changeMode (mode) {  	
    AppDispatcher.handleViewAction({
      actionType: PivotConstants.CHANGE_MODE,
      mode: mode
    });    
  }
};

module.exports = PivotActions;