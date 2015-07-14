'use strict';

var React = require('react/addons');

require('styles/Logo.css');

var Logo = React.createClass({
   propTypes: {
    isSmall: React.PropTypes.bool, 
    largeLogoText: React.PropTypes.string,
    smallLogoText: React.PropTypes.string,
    url: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      isSmall: true,      
      largeLogoText: 'Large Logo',
      smallLogoText: 'Logo',
      url: '/'
    };
  },
  render: function () {
  	var logoStyle = {
  		display: 'block',
        float: 'left',
        height: 50,
        fontSize: 20,
        lineHeight: '50px',
        textAlign: 'center',
        width: this.props.isSmall? null: 230,
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        padding: '0 15px',
        fontWeight: 300,
        overflow: 'hidden',
        borderRight: '1px solid #eee',
        textDecoration: 'none'
  	};
    return (
        <a href={this.props.url} className="Logo" style={logoStyle}>
          	{
          		this.props.isSmall? (<span>{this.props.smallLogoText}</span>)
          						:(<span>{this.props.largeLogoText}</span>)
			}
        </a>
      );
  }
});

module.exports = Logo; 

