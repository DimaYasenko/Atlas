'use strict';
export default {
	mixin: function(stores, fn, indexAction) {
		var callback = fn.bind(null, stores.map(s => s.get()));
		return {
			componentDidMount: function() {					
				stores.forEach(s => s.subscribe(this.update));				
			},

			componentWillUnmount: function() {
				stores.forEach(s => s.unSubscribe(this.update));	
			},

			// getInitialState: function() {
			// 	var  callback = fn.bind(null, stores.map(s => s.get()));
			// 	indexAction && indexAction();
			// 	return callback();
			// },

			update: function() {
				var callback = fn.bind(null, stores.map(s => s.get()));			
				this.setState(callback());
			}
		};
	},
	store: function(_value = {}) {	
		var	_subscribers = [];		
		return {
			subscribe: function(fn) {
				_subscribers.push(fn);
			},
			unSubscribe: function(fn) {
				var index = _subscribers.indexOf(fn);
				_subscribers.splice(index, 1);
			},
			get: function() {
				return _value;
			},
			set: function(newValue) {
				console.log('set');
				var oldValue = _value;
				_value = newValue;
				_subscribers.forEach(s => s(oldValue, newValue));
			}
		};
	},
	remoteStore: function(action) {
		var	_subscribers = [];		

		return {
			subscribe: function(fn) {
				_subscribers.push(fn);
			},
			unSubscribe: function(fn) {
				var index = _subscribers.indexOf(fn);
				_subscribers.splice(index, 1);
			},
			get: function(...params) {				
				action(...params);
				return {
					loading: true
				};
			},
			set: function(value) {
				_subscribers.forEach(s => s(null, value));
			}
		};
	}
};