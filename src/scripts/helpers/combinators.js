'use strict';
import React  from 'react';

function assign(...props) {
	var res = {};
	for (let i in props) {
		
		for (let j in props[i]) {
			res[j] = props[i][j];
		}	
	}
	return res;
}


var partial = function (Component, props) {

	return React.createClass({
		render () {
			return (<Component {...assign(this.props, props)}/>);
		}
	});	
};


var purify = function (Component, lenses) {
	return React.createClass({
		render () {
			var props = {};

				for (let prop in lenses) {
					props[prop] = lenses[prop](this.props.state);
				}
			

			props.state = this.props.state;

			return (<Component {...props}/>);
		}
	});
};
	
var partialBase = function(cmp, props) {
 	return  ((p, c) => { 	
 		var component = React.createFactory(cmp);

 		return component(assign(p, props), c);
 	});
};



 module.exports = { partial, purify };