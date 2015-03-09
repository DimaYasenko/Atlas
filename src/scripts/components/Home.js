// 'use strict';

var React = require('react/addons');

require('styles/Home.css');
var Router = require('react-router'),
    { Route, DefaultRoute, RouteHandler, Link, DefaultRoute } = Router;   



var antechLogo = require('../../images/antech_logo.png');

var Home = React.createClass({
	mixins: [ Router.Navigation ],
  render: function () {
    return (
        <div>        
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fugit nemo voluptatem, natus non hic velit, facilis, obcaecati omnis eum optio esse eaque modi vitae voluptatibus quasi excepturi eos tenetur dolores rem quae? Tempore provident minus quo magnam commodi corporis facere, est nulla quam impedit eveniet recusandae deserunt quod et odit quisquam repudiandae vitae tenetur labore illum, reprehenderit sit dignissimos modi? Quibusdam voluptate quia velit maxime explicabo, quas quis placeat officia atque aut necessitatibus aspernatur mollitia assumenda dolor neque consectetur quidem obcaecati fugit! Deleniti aliquid veritatis sed, doloremque iusto omnis commodi! Velit corporis deserunt odio repellendus perspiciatis fugiat pariatur dolorum.
        	<br />
        	<img src="../../images/antech_logo.png" className="container"/>
        </div>
      );
  },

  statics: {
    willTransitionFrom: function (transition, element) {
      
        if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
          transition.abort();
        }
      
    }
  },
});

module.exports = Home; 

