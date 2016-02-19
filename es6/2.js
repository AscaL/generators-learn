function* foo(x) {
  var y = x * (yield); //yeld asks "what value to inser here instead?"
  return y;
}

var it = foo(6);

// start `foo(..)` and runs till the first yield
it.next();

var res = it.next(7); //gives the yield the value 7 as a result of the yield expression, asnwering the question.

res.value; // 42
