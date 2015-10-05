'use strict';
import React from 'react/addons';

require('../../../styles/react-datepicker.min.css');
require('../../../styles/DatePicker.css');

import DateField from 'react-datepicker';
import moment from 'moment';

export default React.createClass({
	getDefaultProps() {
		return {
			bsStyle: '',
			help: '',
			label: '',
			value: ''			
		};
	},
	render() {
		var map = {
			'': '',
			'error': 'has-error',
			'success': 'has-success',
			'warning': 'has-warning'
		},
		formClass = map[this.props.bsStyle] + ' ' + 'form-group DatePicker',
		value = this.props.value? moment(this.props.value): '';

		return (
			<div className={formClass}>
				<label className="control-label">{this.props.label}</label>
				<DateField ref="exp"
					className="date-field"
					selected={value}
					{...this.props}/>

				<span className="help-block">{this.props.help}</span>
			</div>

			);
	}
});
