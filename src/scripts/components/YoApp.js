// 'use strict';

var React = require('react/addons');
// var TransitionGroup = React.addons.TransitionGroup;
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

//Router
var Router = require('react-router'),
    { Route, DefaultRoute, RouteHandler, Link, DefaultRoute } = Router;   


var ReactBootstrap = require('react-bootstrap'),
    { Nav, NavItem, Navbar, ProgressBar, Alert, DropdownButton, MenuItem } = ReactBootstrap;



var ReactRouterBootstrap = require('react-router-bootstrap'),
    { NavItemLink, ButtonLink, MenuItemLink} = ReactRouterBootstrap;     

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

//Custom components
var Foo = require('./Foo'),
    Destination = require('./Destination'),
    Home = require('./Home'),
    Product = require('./Product'),
    AboutUs = require('./AboutUs'),
    Support = require('./Support'),
    GetDemo = require('./GetDemo'),
    TryForFree = require('./TryForFree'),
    LogIn = require('./LogIn'),
    Pricing = require('./Pricing');

var imageURL = require('../../images/yeoman.png');


function  id (c) {  
}

var YoApp = React.createClass({
  mixins: [ Router.State ],
  render: function() {
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

        <div className="container">
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

