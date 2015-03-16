'use strict';

var React = require('react/addons');

require('styles/PivotSideBar.css');

var ReactBootstrap = require('react-bootstrap'),
	{ Col, Button, Panel, ListGroup, ListGroupItem, Glyphicon} = ReactBootstrap;

var PivotSideBar = React.createClass({
  	render: function () {
  	var header = (<h1><span>Boards:</span>
  		<Button className="pull-right small" ><Glyphicon glyph="chevron-left" /></Button>
  		<Button className="pull-right small" ><Glyphicon glyph="plus"/></Button>
  		</h1>),

  		footer = (<span><Button bsStyle="primary">Add</Button></span>)

    var expanded = (
        <div>
        	
          	<Panel header={header}  footer={footer}>
	        	<ListGroup>
	        		<ListGroupItem href="#link1">Jobs</ListGroupItem>
	        		<ListGroupItem href="#link1" active>Wellbores</ListGroupItem>
	        		<ListGroupItem href="#link1">Customers</ListGroupItem>
	        		<ListGroupItem href="#link1">Well Designer (Viewer)</ListGroupItem>
	        		<ListGroupItem href="#link1">Tubing Forces</ListGroupItem>
	        		<ListGroupItem href="#link1">Hydraulics</ListGroupItem>
	        		<ListGroupItem href="#link1">Tubing life Tracking</ListGroupItem>
	        		<br />
	        		<ListGroupItem href="#link1">Library</ListGroupItem>
	        		<ListGroupItem href="#link1">Tool Rack</ListGroupItem>
	        		<ListGroupItem href="#link1">Archive</ListGroupItem>
	        	</ListGroup>
	      	</Panel>
        </div>
      );

    var collapsedHeader = (<h1><Button className="pull-right small" bsStyle="primary"><Glyphicon glyph="chevron-right" /></Button></h1>)
    var collapsed = (<div>
    	<Panel header={collapsedHeader} bsStyle="primary" footer={footer}>
    	</Panel>
    	</div>);

    return this.props.collapsed? collapsed: expanded;
  }
});

module.exports = PivotSideBar; 

