function dataProps(s0, s1) {
	var enterKeys = [],
		exitKeys = [],
		updateKeys = [];

	for (var k in s1) {
		if (k in s0) {
			updateKeys.push(k);
		} else {
			enterKeys.push(k);
		}
	}

	for (var k in s0) {
		if (! (k in s1)) {
			exitKeys.push(k);
		}
	}

	return {
		enter: enterKeys,
		exit: exitKeys,
		update: updateKeys
	};
}

function dataArray(s0, s1) {
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
	}
}

function dataObj(s0, s1) {
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
	}
}


function data(s0, s1) {
	return ( (isArray(s0) && isArray(s1))? dataArray : dataObj)(s0, s1);
}

function makeObj(props, values) {
	var res = {},
				i,
				key;
	for (i in props) {
		key = props[i];
		res[key] = values[key];
	}
	return res;
}


function prop(nm) {
	return function(obj) {
		return obj[nm];
	};
}

function indx(obj) {
	return function(prop) {
		return obj[prop];
	};
}

function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}


var user1 = {
	name: 'Вася',
	age: 21
};

var user2 = {
	name: 'Петя',
	last: 'Пупкин'
};

module.exports = data;