'use strict';

var React = require('react/addons');

require('styles/PivotSideBar.css');

import { Link, State } from 'react-router';

import { Button, Panel, Glyphicon, Nav, NavItem} from 'react-bootstrap';
import { NavItemLink, ButtonLink, MenuItemLink} from 'react-router-bootstrap';


var PivotSideBar = React.createClass({
    mixins: [ State ],
  	render: function () {
    var name = this.getRoutes().reverse()[0].name;
  	var header = (<h1><span>Boards:</span>
  		<Button className="pull-right small" ><Glyphicon glyph="chevron-left" /></Button>
  		<Button className="pull-right small" ><Glyphicon glyph="plus"/></Button>
  		</h1>),

  		footer = (<span><Button bsStyle="primary">Add</Button></span>);

    var expanded = (
        <div>
        	
          	<Panel header={header}  footer={footer}>
	        	<Nav bsStyle="pills" stacked>
              <NavItemLink to="jobs">Jobs</NavItemLink>
	        		<NavItemLink to="wellbores">Wellbores</NavItemLink>	      
             	
	        		<NavItemLink to="customers">Customers</NavItemLink>
	        		<NavItemLink to="wellDesigner">Well Designer (Viewer)</NavItemLink>
	        		<NavItemLink to="tubingForces">Tubing Forces</NavItemLink>
	        		<NavItemLink to="hydraulics">Hydraulics</NavItemLink>
	        		<NavItemLink to="tubingLifeTracking">Tubing life Tracking</NavItemLink>
	        		<br />
	        		<NavItemLink to="library">Library</NavItemLink>
	        		<NavItemLink to="toolRack">Tool Rack</NavItemLink>
	        		<NavItemLink to="archive">Archive</NavItemLink>
            
	        	</Nav>
	      	</Panel>
        </div>
      );

    var collapsedHeader = (<h1><Button className="pull-right small" bsStyle="primary"><Glyphicon glyph="chevron-right" /></Button></h1>);
    var collapsed = (<div>
    	<Panel header={collapsedHeader} bsStyle="primary" footer={footer}>
    	</Panel>
    	</div>);

    return this.props.collapsed? collapsed: expanded;
  }
});

module.exports = PivotSideBar; 

