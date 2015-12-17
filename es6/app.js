'use strict';

let path = require('path');
let fs = require('fs');
let _ = require('lodash');

const helloFileName = path.join(__dirname, 'hello.txt');

function ajaxCall(url, cb) {
	console.log('in ajaxCall');
	var result = 2;
	return cb(result)
}

function request(url) {
	console.log('in request');
	// Note: returning a promise now!
	return new Promise(function (resolve, reject) {
		console.log('b4 ajaxCall');
		ajaxCall('yo', resolve);
	});
}

function runGenerator(g) {
	console.log('runGenerator');
	var it = g(),
		ret;

	// asynchronously iterate over generator
	(function iterate(val) {
		console.log('val:', val);
		ret = it.next(val);
		console.log('ret:', ret);

		if (!ret.done) {
			console.log('ret not done');
			// poor man's "is it a promise?" test
			if ("then" in ret.value) {
				console.log('there is a then');
				// wait on the promise
				ret.value.then(iterate);
			}
			// immediate value: just send right back in
			else {
				console.log('there is not a then');
				// avoid synchronous recursion
				setTimeout(function () {
					iterate(ret.value);
				}, 0);
			}
		}
	})();
}

runGenerator(function* main() {
	var result1 = yield request("http://some.url.1");
	var data = JSON.parse(result1);
	console.log('data:', data);

	var result2 = yield request("http://some.url.2?id=" + data.id);
	console.log('result2:', result2);
	var resp = JSON.parse(result2);
	console.log('resp:', resp);
	console.log("The value you asked for: " + resp);
});
