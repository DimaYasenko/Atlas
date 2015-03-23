'use strict';
/**
 * Pivot Actions
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import PivotConstants from '../constants/PivotConstants';


function doNothing() {}


var jobs = [
	{
		id: 0,
		name: 'Job1',
		description: 'Some description about Job 1'
	},
	{
		id: 1,
		name: 'Job2',
		description: 'Hello world'
	},
	{
		id: 2,
		name: 'Job3',
		description: 'Hello my little friend'
	},
	{
		id: 3,
		name: 'Job4',
		description: 'Hello job 4'
	}
];

var wellbores = [
	{
		id: 0,
		name: 'Wellbore 1',
		description: 'Some description about wellbore 1'
	},
	{
		id: 1,
		name: 'Wellbore 2',
		description: 'Hello world'
	},
	{
		id: 2,
		name: 'Wellbore 3',
		description: 'Hello my little friend'
	},
	{
		id: 3,
		name: 'Wellbore 4',
		description: 'Hello job 4'
	}
];

const PivotActions = {

  /**
   * @param  {string} mode
   */
  changeMode (mode) {  	
    AppDispatcher.handleViewAction({
      actionType: PivotConstants.CHANGE_MODE,
      mode: mode
    });    
  },

  transition (pathname, params) {
  	
  	var routes = {
  		"jobBoard"() {
			AppDispatcher.handleViewAction({
		  		actionType: PivotConstants.VIEW_JOB,
		  		mode: 'board',
		  		jobs: jobs.map(j => j.name)
		  	});
		},

  		"jobOneByOne"(conf) {
		  	AppDispatcher.handleViewAction({
		  		actionType: PivotConstants.VIEW_JOB,
		  		mode: 'oneByOne',
		  		jobs: jobs.map(j => j.name),
		  		jobDetail: jobs[conf.id || 0]
		  	});
		},



		"wellboreBoard"() {

			AppDispatcher.handleViewAction({
		  		actionType: PivotConstants.VIEW_WELLBORE,
		  		mode: 'board',
		  		wellbores: wellbores.map(j => j.name)
		  	});
		}

  	};


  	(routes[pathname] || doNothing)(params);
  },
 
};

module.exports = PivotActions;