'use strict';


var dataProps, dataArray, dataObj, data, makeObj, prop, indx, isArray;


dataProps = function(s0, s1) {
	var enterKeys = [],
		exitKeys = [],
		updateKeys = [];

	for (let k in s1) {
		if (k in s0) {
			updateKeys.push(k);
		} else {
			enterKeys.push(k);
		}
	}

	for (let k in s0) {
		if (! (k in s1)) {
			exitKeys.push(k);
		}
	}

	return {
		enter: enterKeys,
		exit: exitKeys,
		update: updateKeys
	};
};

dataArray = function(s0, s1) {
	var idx = dataProps(s0, s1);
	return {
		enter: function() {
			return idx.enter.map(indx(s1));
		},
		exit: function() {
			return idx.exit.map(indx(s0));
		},
		update: function() {
			return idx.update.map(indx(s1));
		}
	};
};

dataObj = function(s0, s1) {
	var idx = dataProps(s0, s1);
	return {
		enter: function() {
			
			return makeObj(idx.enter, s1);
		},
		exit: function() {
			return makeObj(idx.exit, s0);
		},
		update: function() {
			return makeObj(idx.update, s1);
		}
	};
};


data = function(s0, s1) {
	return ( (isArray(s0) && isArray(s1))? dataArray : dataObj)(s0, s1);
};

makeObj = function(props, values) {
	var res = {},
				i,
				key;
	for (i in props) {
		key = props[i];
		res[key] = values[key];
	}
	return res;
};


prop = function(nm) {
	return function(obj) {
		return obj[nm];
	};
};

indx = function(obj) {
	return function(prop) {
		return obj[prop];
	};
};

isArray = function(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};

module.exports = data;