'use strict';

var React = require('react/addons');

require('styles/AtlasToolBarMenu.css');
import ToolBarButton from './ToolBarButton';
import User from './User';

var ToolBarMenu = React.createClass({
  render: function () {
  	var style = {
  		float: 'right'
  	};

    return (
        <div className="AtlasToolBarMenu" style={style}>
          <ul className="nav navbar-nav">
            <ToolBarButton icon="envelope-o" hasCount count={4} />
            <ToolBarButton icon="bell-o" hasCount count={10} label="warning" />            
            <ToolBarButton icon="flag-o" hasCount label="danger" count={1} i/>
            <User login="Vasa Pupkin" ava="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTObsbvRGTJUXbhzLkABpz25DUm9L37LV05xAsUpeT8hI4I49Lj"/>
          	<ToolBarButton icon="gears"/>
          </ul>

        </div>
      );
  }
});

module.exports = ToolBarMenu; 

