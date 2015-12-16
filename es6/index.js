function* generator() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
}

var gen = generator();

for (var x of generator()) { //or gen
	console.log(x);
}

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

function *getFib() {
	let val1 = 0;
	let val2 = 1;
	let swap;
	
	yield val1;
	
	yield val2;
	
	while (true) {
		swap = val1 + val2;
		val2 = swap;
		val1 = val2;
		yield swap;
	}
}

for (var x of [12,13,14]) {
	console.log(x);
}

function *getStockPrice(name) {
	console.log('name:', name);
	var symbol = yield getSymbol(name)
	console.log('symbol:', symbol);
	var price = yield getPrice(symbol)
	console.log('price:', price);
}

function getSymbol(name) {
	return name + " from getSymbol";
}

function getPrice(symbol) {
	return symbol + " from getPrice";
}

function spawn(generator) {
	return new Promise((accept, reject) => {
		var onResult = lastPromiseResult => {
			var {value, done} = generator.next(lastPromiseResult);
			if (!done) {
				value.then(onResult, reject)
			}
			else accept(value);
		};
		onResult();
	})
}

spawn(getStockPrice("name")).then(console.log);