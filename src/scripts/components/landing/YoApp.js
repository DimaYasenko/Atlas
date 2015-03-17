'use strict';

import React from 'react/addons';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Router from 'react-router';
import { State, Route, DefaultRoute, RouteHandler, Link, DefaultRoute } from 'react-router';
import { Nav, NavItem, Navbar, ProgressBar, Alert, DropdownButton, MenuItem } from 'react-bootstrap';
import { NavItemLink, ButtonLink, MenuItemLink} from 'react-router-bootstrap';

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');


//Custom components
import Destination from './Destination';
import Home from './Home';
import Product from './Product';
import AboutUs from './AboutUs';
import Support from './Support';
import GetDemo from './GetDemo';
import TryForFree from './AtlasPivot';
import LogIn from './LogIn';
import Pricing  from './Pricing';


var imageURL = require('../../images/yeoman.png');


function  id (c) {  
}

var YoApp = React.createClass({
  mixins: [ State ],
  render() {
    var name = this.getRoutes().reverse()[0].name;
    return (
     <div>
        <Navbar brand="Atlas" inverse toggleNavKey={0}>
          <Nav left eventKey={0}> {/* This is the eventKey referenced */}
            <NavItemLink to="home" eventKey={1}>Home</NavItemLink>
            <NavItemLink to="product" eventKey={1}>Product</NavItemLink>
            
            <DropdownButton  eventKey={3} title="Learning" onSelect={id}>
              <MenuItem>Online classes</MenuItem>
              <MenuItem>Onsite workshop</MenuItem>
              <MenuItem>Webinars</MenuItem>
              <MenuItem>User Guide</MenuItem>              
            </DropdownButton>
            
            <NavItemLink to="pricing" className="pricing" eventKey={1}>Pricing</NavItemLink>
            <NavItemLink to="about_us" eventKey={1}>About Us</NavItemLink>
            <NavItemLink to="support" eventKey={1}>Support</NavItemLink>
            <NavItemLink to="get_demo" >Get a Demo</NavItemLink>
            <NavItemLink to="try_for_free" eventKey={1}>Try for free</NavItemLink>
            <NavItemLink to="log_in" eventKey={1}>Log in</NavItemLink>
          </Nav>            
        </Navbar>  

      
        <div>
          <TransitionGroup component="div" transitionName="example">
            <RouteHandler key={name}/>
          </TransitionGroup>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route handler={YoApp} path="/">
    <DefaultRoute handler={Home} />
    <Route name="destination" path="destination/:someparam" handler={Destination} />
    <Route name="home" path="home" handler={Home} />
    <Route name="product" path="product" handler={Product} />
    <Route name="pricing" path="pricing" handler={Pricing} />
    <Route name="about_us" path="about_us" handler={AboutUs} />
    <Route name="support" path="support" handler={Support} />
    <Route name="get_demo" path="get_demo" handler={GetDemo} />
    <Route name="try_for_free" path="try_for_free" handler={TryForFree} />
    <Route name="log_in" path="log_in" handler={LogIn} />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});


module.exports = YoApp;

