'use strict'

let x = 1;

function* foo() {
  x++;
  yield; // pause!
  console.log("x from foo:", x); // runs after second generator
}

function bar() {
  x++;
}

let it = foo()  //construct an iterator for foo

it.next(); //starts the generator
console.log('x1:', x);
// YIELD PAUSE
bar()
console.log('x2:', x);
it.next() //resumes the generator
console.log('x:', x);
