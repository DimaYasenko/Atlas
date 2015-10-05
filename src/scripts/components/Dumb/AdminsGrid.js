'use strict';

/* Dependencies */
import React from 'react/addons';

import AtlasGrid from '../AtlasGrid';

var AdminsGrid = React.createClass({
	statics: {
		columns: [
		{
			name: 'id',
			width: 70		
		}, 
		{
			name: 'login'
		},
		{
			name: 'email'			
		}]
	},
	propTypes: {
		data: React.PropTypes.arrayOf(
			React.PropTypes.shape({
		      id: React.PropTypes.string,
		      login: React.PropTypes.string,
		      email: React.PropTypes.string		     
		    })
		)
	},	

	render() {
		return (<div>
			<AtlasGrid columns={AdminsGrid.columns}
						idProperty="id"
						dataSource={this.props.data}
						{...this.props}/></div>)
	}

});


module.exports = AdminsGrid;