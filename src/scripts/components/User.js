'use strict';

var React = require('react/addons');

require('styles/User.css');

var User = React.createClass({
  render: function () {
    return (
        <li className="User dropdown user user-menu">
                <a href="#" className="dropdown-toggle" aria-expanded="false">
                  <img src={this.props.ava} className="user-image" alt="User Image" />
                  <span className="hidden-xs">{this.props.login}</span>
                </a>
      	</li>);
  }
});

module.exports = User; 

