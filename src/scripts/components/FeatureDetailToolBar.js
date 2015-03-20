'use strict';

import React from 'react/addons';

require('styles/FeatureDetailToolBar.css');
import { Col, Button, ButtonToolbar, ButtonGroup, Glyphicon, Panel, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ButtonLink, MenuItemLink } from 'react-router-bootstrap';
import Router from 'react-router';
import { Link } from 'react-router';



var pivotActions = require('../actions/PivotActions');

var FeatureDetailToolBar = React.createClass({	
  render: function () {
  	var currentPath = Router.HistoryLocation.getCurrentPath();
  	console.log(this.props);
  		
    return (
        <Panel>

          <ButtonToolbar className="pull-right">
		      <ButtonGroup>	          

		        <OverlayTrigger placement="top" overlay={<Tooltip>Board</Tooltip>}>
		        	<ButtonLink to={this.props.boardRouteName}><Glyphicon glyph="th"/></ButtonLink>
		        </OverlayTrigger>

		        <OverlayTrigger placement="top" overlay={<Tooltip>One by one</Tooltip>}>
		        	<ButtonLink to={this.props.oneByOneRouteName}><Glyphicon glyph="th-list"/></ButtonLink>		        
		        </OverlayTrigger>


		        <OverlayTrigger placement="top" overlay={<Tooltip>List</Tooltip>}>
      				<ButtonLink to={this.props.listRouteName} ><Glyphicon glyph="list-alt"/></ButtonLink>
      			 </OverlayTrigger>
		      </ButtonGroup>

		      <ButtonGroup>
		      	<Button>Actions</Button>
		      </ButtonGroup>
	      </ButtonToolbar>
        </Panel>
      );
  },
  _onClick: function(mode) {
  	pivotActions.changeMode(mode);
  	console.log(mode);
  }
});

module.exports = FeatureDetailToolBar; 

