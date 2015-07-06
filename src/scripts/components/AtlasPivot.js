'use strict';

import React from 'react/addons';

require('styles/AtlasPivot.css');

import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Router from 'react-router';
import { State, Route, DefaultRoute, Redirect, RouteHandler, Link, DefaultRoute } from 'react-router';

import PivotStore from '../stores/PivotStore';

import { Col, Button, ListGroup, ListGroupItem, TabbedArea, TabPane, Badge} from 'react-bootstrap';
import { NavItemLink, ButtonLink, MenuItemLink} from 'react-router-bootstrap';
import PivotToolBar from './PivotToolBar';
import PivotSideBar from './PivotSideBar';
import FeatureDetail from './FeatureDetail';
import ThDetail from './ThDetail';
// import JobBoard from './JobBoard';
import { partial, purify } from '../helpers/combinators';
import FeatureDetailToolBar from './FeatureDetailToolBar';
import PivotActions from '../actions/PivotActions';
import JobOneByOne from './JobOneByOne';

import LineChart from './LineChart';
var mui = require('material-ui');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import {FlatButton} from 'material-ui';

var ThemeManager = new mui.Styles.ThemeManager();


import CustomerBoard from './CustomerBoard';
import CustomerMain from './CustomerMain';

var key = 1;

function getPivotState() {
	return PivotStore.getAll();  
}

function randomValues () {
  var data = [];
  var k = Math.random() * 10;
  var c = Math.random() * 100;

  for (var i = 0; i < 500; i++) {
     data.push([i, Math.sin(i) * 2  + c]);
  }
  return data;
}
var AtlasPivot = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
    },

  getChildContext: function() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
  },


	getInitialState: function() {		
		return getPivotState();		
	},	
	componentDidMount: function() {
	    PivotStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
    	PivotStore.removeChangeListener(this._onChange);
  },
  render: function () {
    var data = [];
    for (var i = 0; i < 10; i++) {
      data.push({
        label: 'Test' + i,
        data: randomValues()
      });
    }
    return (    	
        <div>
          <FlatButton label="Default" primary/>          

          <LineChart 
                data={data} 
                key={0} 
                title="WOB vs Depth" 
                width={800}
                xLabel="Depth"
                yLabel="WOB"
                />

          
        	<Col xs={12}><PivotToolBar /></Col>
          	<Col xs={2}><PivotSideBar/></Col>
          	<Col xs={10}> 
              <TransitionGroup component="div" transitionName="example">
                <RouteHandler state={this.state} key={name}/>
              </TransitionGroup>
          </Col>          
        </div>
      );
  },
   _onChange: function() {
    	this.setState(getPivotState());
  }
});



var WellboreDetailToolbar = partial(FeatureDetailToolBar, 
    { 
      boardRouteName: 'wellboreBoard',
      oneByOneRouteName: 'wellboreOneByOne',
      listRouteName: 'wellboreList',      
    });

var WellboreDetail = partial(FeatureDetail, 
    {
      toolBar: WellboreDetailToolbar
    });


var WellboresBoard = purify(ThDetail, {
  items: s=> s.wellbores
});



var JobDetailToolbar = partial(FeatureDetailToolBar, 
    { 
      boardRouteName: 'jobBoard',
      oneByOneRouteName: 'jobOneByOne',
      listRouteName: 'jobList',      
    });

var JobDetail = partial(FeatureDetail, 
    {
      toolBar: JobDetailToolbar
    });


var JobBoard = purify(ThDetail, {
  items: s => s.jobs
});

var JobOneByOnePure = purify(JobOneByOne, {
  items: s => s.jobs,
  id: s => s.jobDetail.id,
  name: s => s.jobDetail.name,
  description: s => s.jobDetail.description
});

var MyText = React.createClass({
  getInitialState: function () {
      console.log('initial state');
      return null;
  },
  componentDidMount: function () {
      console.log('text was mounted');
  },
  render() {
    return (<div>MyText</div>);
  }
});


var MyText2 = React.createClass({
  getInitialState: function () {
      console.log('initial state2');
      return null;
  },
  componentDidMount: function () {
      console.log('text2 was mounted');
  },
  render() {
    return (<div><MyText/></div>);
  }
});

var prop = function(nm) { return obj => obj[nm]; };

var Wellbores = partial(MyText, {text: 'Wellbores'});

var PuryHello = purify(MyText, {text: s => s.helloText });

var state = {
  helloText: 'Hello world'
};

var Hello = partial(PuryHello, { state: state});

// ThemeManager.setTheme(ThemeManager.types.LIGHT);

var routes = (
  <Route name="root" handler={AtlasPivot} path="/">
    <Route name="jobs" path="/jobs/board" handler={JobDetail}>
      <Route name="jobBoard" path="/jobs/board" handler={JobBoard} myProp="test"></Route>
      <Route name="jobOneByOne" path="/jobs/oneByOne/:id?" handler={JobOneByOnePure}></Route>
      <Route name="jobList" path="/jobs/list" handler={Hello}></Route>
    </Route>  
    
    <Route name="wellbores" path="/wellbores/board" handler={WellboreDetail}>         
      <Route name="wellboreBoard" path="/wellbores/board" handler={WellboresBoard}></Route>
      <Route name="wellboreOneByOne" path="oneByOne" handler={JobBoard}></Route>
      <Route name="wellboreList" path="list" handler={JobBoard}></Route>     
    </Route>
    <Route name="customers" path="/customers/board" handler={CustomerBoard}>
      <Route name="customerBoard" path="/customers/board" handler={CustomerMain}/>
      <Route name="customerOneByOne" handler={Hello}/>
      <Route name="customerList" handler={Hello}/>
    </Route>
    <Route name="wellDesigner" path="/wellDesigner" handler={Hello}></Route>
    <Route name="tubingForces" path="/tubingForces" handler={Hello}></Route>
    <Route name="hydraulics" path="/hydraulics" handler={Hello}></Route>
    <Route name="tubingLifeTracking" path="/tubingLifeTracking" handler={Hello}></Route>
    <Route name="library" path="/library" handler={Hello}></Route>
    <Route name="toolRack" path="/toolRack" handler={Hello}></Route>
    <Route name="archive" path="/archive" handler={Hello}></Route>
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler/>, document.body);
  var router = Router.match;

  var deepestRouteName = state.routes[state.routes.length - 1].name;
  var topLevelRouteName = state.routes[0].name;
  var allRouteNamesArray = state.routes.map(route => route.name);
  PivotActions.transition(deepestRouteName, state.params);

});


module.exports = AtlasPivot; 

