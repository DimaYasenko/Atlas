'use strict';

require('styles/AtlasPivot.css');

import React from 'react/addons';
import Router from 'react-router';
import { State, Route, DefaultRoute, Redirect, RouteHandler, Link, DefaultRoute, Link } from 'react-router';
import AtlasToolBar from 'components/AtlasToolBar';
import AtlasSideBar from 'components/AtlasSideBar';
import AccountGrid from 'components/AccountGrid';
import Users from 'components/Users';
import AdminGrid from 'components/AdminGrid';

import Flux from 'helpers/flux';

var AtlasApp = React.createClass({
	render: function() {
		return (<div className="AtlasPivot skin-red-light">            	 
          <div className="wrapper">
        	   <AtlasToolBar />
          	 <AtlasSideBar/>
             
             <div className="content-wrapper">                
                <RouteHandler />                  
            </div>
            </div>
        </div>);
	}
});


var routes = (
  <Route name="root" handler={AtlasApp} path="/">
  	   	<Route name="users" path="users" handler={Users}>
  	   		<Route name="admins" path="/users/admins" handler={AdminGrid}/>
  	   		<Route name="tenants" path="/users/tenants" handler={AccountGrid}/>
  	   		<Route name="employees" path="/users/employees" handler={AccountGrid}/>
  	   		<Redirect from="/users" to="admins"/>

  	   	</Route>
  	    <Route name="registeredRequests" path="regreq" hander={AdminGrid}/>


  </Route>
);



Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler/>, document.body);
  // var router = Router.match;

  // var deepestRouteName = state.routes[state.routes.length - 1].name;
  // var topLevelRouteName = state.routes[0].name;
  // var allRouteNamesArray = state.routes.map(route => route.name);
  // PivotActions.transition(deepestRouteName, state.params);

});


