'use strict';

var React = require('react/addons');

require('styles/FeatureDetailToolBar.css');
var ReactBootstrap = require('react-bootstrap'),
	{ Col, Button, ButtonToolbar, ButtonGroup, Glyphicon, Panel, OverlayTrigger, Tooltip } = ReactBootstrap;


var pivotActions = require('../actions/PivotActions');

var FeatureDetailToolBar = React.createClass({
  render: function () {
    return (
        <Panel>
          <ButtonToolbar className="pull-right">
	          
		      <ButtonGroup>
		        <OverlayTrigger placement="top" overlay={<Tooltip>Board</Tooltip>}>
		        	<Button active={this.props.mode =="board"} onClick={this._onClick.bind(this, 'board')}><Glyphicon glyph="th"/></Button>
		        </OverlayTrigger>

		        <OverlayTrigger placement="top" overlay={<Tooltip>One by one</Tooltip>}>
		        	<Button active={this.props.mode =="oneByOne"} onClick={this._onClick.bind(this, 'oneByOne')}><Glyphicon glyph="th-list"/></Button>		        
		        </OverlayTrigger>


		        <OverlayTrigger placement="top" overlay={<Tooltip>List</Tooltip>}>
      				<Button active={this.props.mode =="list"} onClick={this._onClick.bind(this, 'list')}><Glyphicon glyph="list-alt"/></Button>
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

