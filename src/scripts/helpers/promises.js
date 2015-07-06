'use strict';
module.exports = {
	delay: function (ms) {
		 return new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
        });
	},
	timeout: function (ms, promise) {
        return new Promise(function (resolve, reject) {
            promise.then(resolve);
            setTimeout(function () {
                reject(new Error('Timeout after '+ms+' ms')); // (A)
            }, ms);
        });
    }
};