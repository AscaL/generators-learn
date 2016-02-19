function* foo(x) {
  var y = x * (yield "Hello"); // <-- yield a value to the first next
  return y;
}

var it = foo(6);

// asks the question "what next value does the *foo generato have to give me?", and the first yield answer "hello"
var res = it.next(); // first `next()`, don't pass anything! (no yields to pass to)
console.log(res.value); //"Hello"

res = it.next(7); // pass `7` to waiting `yield`. the next value is the "return y"!
console.log(res.value); // 42
