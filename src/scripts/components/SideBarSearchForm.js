'use strict';

var React = require('react/addons');

require('styles/SideBarSearchForm.css');

var SideBarSearchForm = React.createClass({
  render: function () {
    return (    
          <form action="#" method="get" className="SideBarSearchForm sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                	<i className="fa fa-search"></i>
            	</button>
              </span>
            </div>
          </form>
      );
  }
});

module.exports = SideBarSearchForm; 
