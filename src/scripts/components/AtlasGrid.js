'use strict';

/* Styles */
require('react-datagrid/index.css');
require('styles/AtlasGrid.css');

/* Dependencies */
import React from 'react/addons';
import DataGrid from 'react-datagrid';


var AtlasGrid = React.createClass({
	propTypes: {
		bottomToolBar: React.PropTypes.element
	},
	getDefaultProps: function() {
		return {
			bottomToolBar: {}
		};
	},
	getInitialState: function() {
		return {
			selected: null
		};
	},
	componentDidMount: function() {
		var innerGrid = React.findDOMNode(this.refs.innerGrid);
		var loadMask = innerGrid.querySelector('.loadmask');
		var dataGrid = React.findDOMNode(this.refs.dataGrid);
		dataGrid.appendChild(loadMask);
	},
 	render: function () {
 		var toolBar = React.cloneElement(this.props.bottomToolBar, {selectedRecord: this.state.selectedRecord });
 		var selectedRecord = this.state.selectedRecord,
 			selectedId = this.state.selectedId;



	 	return (<div 	className="AtlasGrid"
 						ref="dataGrid"
	 				 	style={this.props.style || {}}>
	 				
	 				<header className="AtlasGrid-Header"><h3>{this.props.title}</h3></header>
			 		<DataGrid 	className="AtlasGrid-Inner"
						 		ref="innerGrid"
						 		{...this.props}                
						        pagination={true}        
						        onSelectionChange={this.onSelection}
						        pageSize={10}
						        selected={selectedId}
						        paginationToolbarProps={{
						          showPageSize: false
						        }}  
						        onColumnResize={this.onColumnResize}						        
						        onDataSourceSuccess={this.onSuccess}                    
						        emptyText={'No records'}
						        style={{minHeight: 350, padding: 10}} />
			        <div className="AtlasGrid-Bottom-Toolbar">
			        	{toolBar }
		        	</div>
	        </div>);
	},
	onSelection: function(newSelectedId, data) {		
	    this.setState({selectedId: newSelectedId, selectedRecord: newSelectedId === null? null: data});
	},
	onColumnResize: function(firstCol, firstSize, secondCol, secondSize){
	    firstCol.width = firstSize;
		this.setState({});
	},
});

module.exports = AtlasGrid;