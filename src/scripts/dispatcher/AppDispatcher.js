"use strict";

import Dispatcher from './Dispatcher';
import assign  from 'object-assign';

const AppDispatcher = assign({}, Dispatcher.prototype, {
  handleViewAction (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
