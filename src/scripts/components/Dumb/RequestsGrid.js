'use strict';

/* Dependencies */
import React from 'react/addons';

import AtlasGrid from '../AtlasGrid';

var RequestsGrid = React.createClass({
	statics: {
		columns: [
		{
			name: 'id',
			width: 70		
		}, 
		{
			name: 'companyName'
		},
		{
			name: 'login'
		},
		{
			name: 'email'			
		},
		{
			name: 'aboutUs'
		},
		{
			name: 'status'
		}]
	},
	propTypes: {
		data: React.PropTypes.arrayOf(
			React.PropTypes.shape({
		      id: React.PropTypes.string,
		      companyName: React.PropTypes.string,
		      login: React.PropTypes.string,
		      email: React.PropTypes.string,	     
		      aboutUs: React.PropTypes.string,		     
		      status: React.PropTypes.string		     
		    })
		)
	},	

	render() {
		return (<div>
			<AtlasGrid columns={RequestsGrid.columns}
						idProperty="id"
						dataSource={this.props.data}
						{...this.props}/></div>)
	}

});


module.exports = RequestsGrid;