'use strict';

var React = require('react/addons');

require('styles/AtlasSideBar.css');
import SideBarSearchForm from './SideBarSearchForm';
import AtlasSideBarMenu from './AtlasSideBarMenu';

var AtlasSideBar = React.createClass({
  render: function () {
    return (<aside className="AtlasSideBar main-sidebar">
        
        <section className="sidebar">
          
          
    	    <SideBarSearchForm />
	         
         	<AtlasSideBarMenu />
        </section>      
      </aside>
      );
  }
});

module.exports = AtlasSideBar; 

