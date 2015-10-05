'use strict';

/* Dependencies */
import React from 'react/addons';

import AtlasGrid from '../AtlasGrid';

var TenantsGrid = React.createClass({
	statics: {
		columns: [
		{
			name: '',
			width: 40,
			style: {
				textAlign: 'center',
				fontSize: 'large'				
			},
			render: function(_, d) {
				
				return d.locked? (<i className="fa fa-expeditedssl">&nbsp;</i>): '';
			}
		}, 
		{
			name: 'id',
			width: 70		
		}, 
		{
			name: 'login',
			width: 140
		},
		{
			name: 'email'			
		},
		{
			name: 'name'			
		},
		
		{
			name: 'exp',
			render: function(_, d) {
				return 1900 + d.exp.getYear() + '/' + (d.exp.getMonth() + 1) + '/' + d.exp.getDate();
			}
		}]
	},
	propTypes: {
		data: React.PropTypes.arrayOf(
			React.PropTypes.shape({
		      id: React.PropTypes.string,
		      login: React.PropTypes.string,
		      email: React.PropTypes.string,
		      name: React.PropTypes.string,
		      locked: React.PropTypes.bool,
		      exp: React.PropTypes.instanceOf(Date)
		    })
		)
	},	

	render() {
		return (<div>
			<AtlasGrid columns={TenantsGrid.columns}
						idProperty="id"
						dataSource={this.props.data}
						{...this.props}/></div>)
	}

});


module.exports = TenantsGrid;