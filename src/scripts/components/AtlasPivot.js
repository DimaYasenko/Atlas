'use strict';

var React = require('react/addons');

require('styles/AtlasPivot.css');


var PivotStore = require('../stores/PivotStore');

var ReactBootstrap = require('react-bootstrap'),
	{ Col, Button, ListGroup, ListGroupItem, TabbedArea, TabPane, Badge} = ReactBootstrap;

var PivotToolBar = require('./PivotToolBar'),
	PivotSideBar = require('./PivotSideBar'),
	FeatureDetail = require('./FeatureDetail');

var ThDetail = require('./ThDetail');
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
  		console.log('render');  	
  		var thDetail = (<ThDetail items={this.state.jobs}/>);
  		var thList = (<div>
  				<Col xs={2}>
  					 <ListGroup>
  					 {this.state.jobs.map(function(d, id) { return (<ListGroupItem key={id}>{d}</ListGroupItem>);} )}				      
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
  			</div>)
    return (    	
        <div>
        	<Col xs={12}><PivotToolBar /></Col>
          	<Col xs={2}><PivotSideBar/></Col>
          	<Col xs={10}><FeatureDetail board={thDetail} oneByOne={thList} mode={this.state.mode}/></Col>          
        </div>
      );
  },
   _onChange: function() {
   		console.log('Changed');
    	this.setState(getPivotState());
  }
});

module.exports = AtlasPivot; 

