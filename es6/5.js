var a = 1;
var b = 2;

function* foo() {
  a++;
  console.log('s1 a:', a);
  yield;
  b = b * a;
  console.log('s1 b:', b);
  a = (yield b) + 3;
  console.log('s1 a:', a);
}

function* bar() {
  b--;
  console.log('s2 b:', b);
  yield;
  a = (yield 8) + b;
  console.log('s2 a:', a);
  b = a * (yield 2);
  console.log('s2 b:', b);
}

function step(gen) {
  var it = gen();
  var last;

  return () => {
    last = it.next(last).value
  }
}


// make sure to reset `a` and `b`
a = 1;
b = 2;
var s1 = step(foo);
var s2 = step(bar);

s2(); // b--; b=1
s2(); // yield 8
s1(); // a++; // a=2
s2(); // a = 8 + b; //a = 9
// yield 2
s1(); // b = b * a; //b=9
// yield b
s1(); // a = b + 3; //a=12
s2(); // b = a * 2; //b=18

console.log(a, b); // 12 18

// make sure to reset `a` and `b`
a = 1;
b = 2;
var s1 = step(foo);
var s2 = step(bar);

// run `*foo()` completely first
s1();
s1();
s1();
// now run `*bar()`
s2();
s2();
s2();
s2();

console.log(a, b); // 11 22
