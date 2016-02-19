function* foo() {
  var x = yield 2;
  z++;
  var y = yield(x * z);
  console.log(x, y, z);
}

var z = 1;

var it1 = foo(); //start the generator
var it2 = foo(); //start the generator

var val1 = it1.next().value; // 2 <-- yield 2
console.log('val1:', val1);

var val2 = it2.next().value; // 2 <-- yield 2
console.log('val2:', val2);

val1 = it1.next(val2 * 10).value; // 40  <-- x:20,  z:2. the value is sent by the second yield expression
console.log('val1:', val1);

val2 = it2.next(val1 * 5).value; // 600 <-- x:200, z:3. the value is sent by the second yield expression
console.log('val2:', val2);

it1.next(val2 / 2); // y:300 the value recived by next is undefined here (no return)
// 20 300 3
it2.next(val1 / 4); // y:10 the value recived by next is undefined here (no return)
// 200 10 3
