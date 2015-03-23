'use strict';

var React = require('react/addons');

require('styles/JobOneByOne.css');

import { Link } from 'react-router';

var JobOneByOne = React.createClass({
  render: function () {
    return (
        <div>
          <ul>
          	{this.props.items.map( (d, i) => <li><Link to="jobOneByOne" params={{id: i}}>{d}</Link></li> )}
          </ul>

          <table className="table">
           <thead>
		        <tr>		          
		          <th>Id</th>
		          <th>Name</th>
		          <th>Description</th>
		        </tr>		        
		      </thead>
		      <tbody>
		      	 <tr>
		          <td>{this.props.id}</td>
		          <td>{this.props.name}</td>
		          <td>{this.props.description}</td>
		        </tr>
		      </tbody>
          </table>
        </div>
      );
  }
});

module.exports = JobOneByOne; 

