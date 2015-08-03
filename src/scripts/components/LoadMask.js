'use strict';

import React from 'react/addons';

export default React.createClass({
	

	render: function() {
		var loadStyle = {
			background:'rgba(256, 256, 256, 0.5)',
			position: 'absolute', 
			width: '100%',
			height:'100%',
			display:'block',
			top:0, 
			left:0
		}
		var innerStyle = {
			margin:'auto',
			position:'absolute',
			top:0, 
			left:0,
			bottom:0,
			right:0,
			width:'40px', 
			height:'40px'
		};

		return (<div style={loadStyle} className=" loadmask">
					<div size="40" style={innerStyle} className=" loader">
						<div className="loadbar loadbar-1"></div>
						<div className="loadbar loadbar-2"></div>
						<div className="loadbar loadbar-3"></div>
						<div className="loadbar loadbar-4"></div>
						<div className="loadbar loadbar-5"></div>
						<div className="loadbar loadbar-6"></div>
						<div className="loadbar loadbar-7"></div>
						<div className="loadbar loadbar-8"></div>
						<div className="loadbar loadbar-9"></div>
						<div className="loadbar loadbar-10"></div>
						<div className="loadbar loadbar-11"></div>
						<div className="loadbar loadbar-12"></div>
					</div>
				</div>);		
	}
});
