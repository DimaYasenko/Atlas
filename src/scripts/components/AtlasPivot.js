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
import JobBoard from './JobBoard';
import { partial, purify } from '../helpers/combinators';
import FeatureDetailToolBar from './FeatureDetailToolBar';

var key = 1;

function getPivotState() {
	return PivotStore.getAll();  
}

var AtlasPivot = React.createClass({
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
  		var thDetail = (<ThDetail items={this.state.jobs}/>);

  		var thList = (<div>
  				<Col xs={2}>
  					 <ListGroup>
  					 {this.state.jobs.map((d, id) => <ListGroupItem key={id}>{d}</ListGroupItem>)}
				    </ListGroup>
  				</Col>
  				<Col xs={10}> 
  				<TabbedArea activeKey={key}>
			      <TabPane eventKey={1} tab="Description">TabPane 1 content</TabPane>
			      <TabPane eventKey={2} tab={<span>Wellbores <Badge>42</Badge></span>}>TabPane 3 content</TabPane>
			      <TabPane eventKey={2} tab={<span>Customers <Badge>42</Badge></span>}>TabPane 4 content</TabPane>
			      <TabPane eventKey={2} tab="History">TabPane 5 content</TabPane>
			    </TabbedArea>
   				</Col>
  			</div>);
      
    return (    	
        <div>
        	<Col xs={12}><PivotToolBar /></Col>
          	<Col xs={2}><PivotSideBar/></Col>
          	<Col xs={10}> 
              <TransitionGroup component="div" transitionName="example">
                <RouteHandler key={name}/>
              </TransitionGroup>
          </Col>          
        </div>
      );
  },
   _onChange: function() {
    	this.setState(getPivotState());
  }
});


var JobDetailToolbar = partial(FeatureDetailToolBar, 
    { 
      boardRouteName: 'jobs/board',
      oneByOneRouteName: 'jobs/oneByOne',
      listRouteName: 'jobs/list',      
    });

var JobDetail = partial(FeatureDetail, 
    {
      toolBar: JobDetailToolbar
    });

var MyText = React.createClass({
  render() {
    console.log(this.props.text);
    return (<div>{this.props.text}</div>);
  }
});

var prop = function(nm) { return obj => obj[nm]; };

var Wellbores = partial(MyText, {text: 'Wellbores'});
var PuryHello = purify(MyText, {text: prop('helloText') });
var state = {
  helloText: 'Hello world'
};

var Hello = partial(PuryHello, { state: state});

var routes = (
  <Route handler={AtlasPivot} path="/">
    <Route name="jobs" path="/jobs" handler={JobDetail}>
      <Route name="jobs/board" path="jobs/board" handler={JobBoard}></Route>
      <Route name="jobs/oneByOne" path="jobs/oneByOne" handler={Hello}></Route>
      <Route name="jobs/list" path="jobs/list" handler={Hello}></Route>
    </Route>  
    <Route name="wellbores" path="/wellbores" handler={Wellbores}>         
      <Route name="wellbores/board" path="board" handler={JobBoard}></Route>
      <Route name="oneByOne" path="oneByOne" handler={JobBoard}></Route>
      <Route name="list" path="list" handler={JobBoard}></Route>     
    </Route>
    <Route name="customers" path="/customers" handler={Hello}></Route>
    <Route name="wellDesigner" path="/wellDesigner" handler={Hello}></Route>
    <Route name="tubingForces" path="/tubingForces" handler={Hello}></Route>
    <Route name="hydraulics" path="/hydraulics" handler={Hello}></Route>
    <Route name="tubingLifeTracking" path="/tubingLifeTracking" handler={Hello}></Route>
    <Route name="library" path="/library" handler={Hello}></Route>
    <Route name="toolRack" path="/toolRack" handler={Hello}></Route>
    <Route name="archive" path="/archive" handler={Hello}></Route>
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});


module.exports = AtlasPivot; 

