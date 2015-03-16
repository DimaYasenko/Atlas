'use strict';

var React = require('react/addons');

require('styles/Product.css');
var data = require('../helpers/dataJoin');

var store = [123];
var id = 0;

var Product = React.createClass({
	getInitialState: function() {
		return {oldData: [], data: store};
	},
  	render: function () {
  	var join = data(this.state.oldData, this.state.data);

  	var update = join.update();
  	var added = join.enter();

  	var list = update.map(function(d, id) {
  		return (<li key={id}>{d}</li>);
  	});
  	var addedList = added.map(function(d, id) {
  		return (<span key={id}>{d}</span>);
  	});

  	var addedAnimatedList = added.map(function (d) {
  		return (<li key={id++} className="animation">{d}</li>);
  	});

    return (
        <div>
          <input type="text" ref="txt"/>
          <button onClick={this.onAdd}>Add</button>
          <ul>{list}</ul>
          <div>Added items:</div>
          {addedList}

          <div>Another use</div>
          <ul>
          	{list}
          	{addedAnimatedList}
          </ul>
        </div>
      );
  },
  onAdd: function() {  	
  	var data =  [].concat(this.state.data);
  	data.push(this.refs.txt.getDOMNode().value);
	this.refs.txt.getDOMNode().value = "";
  	this.setState({
  		oldData: this.state.data,
  		data: data
  	});
  }  
});

module.exports = Product; 

