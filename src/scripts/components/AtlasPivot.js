'use strict';

import React from 'react/addons';

require('styles/AtlasPivot.css');

import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Router from 'react-router';
import { State, Route, DefaultRoute, RouteHandler, Link, DefaultRoute } from 'react-router';

import PivotStore from '../stores/PivotStore';

import { Col, Button, ListGroup, ListGroupItem, TabbedArea, TabPane, Badge} from 'react-bootstrap';
import { NavItemLink, ButtonLink, MenuItemLink} from 'react-router-bootstrap';
import PivotToolBar from './PivotToolBar';
import PivotSideBar from './PivotSideBar';
import FeatureDetail from './FeatureDetail';
import ThDetail from './ThDetail';

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

var thList = (<div>
          <Col xs={2}>
             <ListGroup>
              
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

var routes = (
  <Route handler={AtlasPivot} path="/">
    <Route name="jobs" path="/jobs" handler={FeatureDetail}></Route>  
    <Route name="wellbores" path="/wellbores" handler={FeatureDetail}>  
      <DefaultRoute  />    
      <Route name="wellbores/board" path="board" handler={ThDetail}></Route>
      <Route name="oneByOne" path="oneByOne" handler={thList}></Route>
      <Route name="list" path="list" handler={thList}></Route>
    </Route>
    <Route name="customers" path="/customers" handler={FeatureDetail}></Route>
    <Route name="wellDesigner" path="/wellDesigner" handler={FeatureDetail}></Route>
    <Route name="tubingForces" path="/tubingForces" handler={FeatureDetail}></Route>
    <Route name="hydraulics" path="/hydraulics" handler={FeatureDetail}></Route>
    <Route name="tubingLifeTracking" path="/tubingLifeTracking" handler={FeatureDetail}></Route>
    <Route name="library" path="/library" handler={FeatureDetail}></Route>
    <Route name="toolRack" path="/toolRack" handler={FeatureDetail}></Route>
    <Route name="archive" path="/archive" handler={FeatureDetail}></Route>
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});


module.exports = AtlasPivot; 

