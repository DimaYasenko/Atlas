'use strict';

var React = require('react/addons');

require('styles/AtlasSideBarMenu.css');

import MenuItem from 'components/AtlasSideBarMenuItem';

var AtlasSideBarMenu = React.createClass({
  render: function () {
    return (<ul className="AtlasSideBarMenu">
            <li className="header">MAIN NAVIGATION</li>
            <MenuItem   label="Users"
                        icon="user"
                        link="users"
            />
            
            <MenuItem label="Requests"
                      icon="envelope"
                      link="requests"
            />

            <MenuItem label="Documentation"
                      icon="book"/>
            </ul>
      );
  }
});

module.exports = AtlasSideBarMenu; 

