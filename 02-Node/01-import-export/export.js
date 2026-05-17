console.log("Here, we'll learn about modules!");
console.log("First Class -> Import and Export!");

// add
function add(a, b) {
  return a + b;
}
// sub
function sub(a, b) {
  return a - b;
}
// mul
function mul(a, b) {
  return a * b;
}
// division
function division(a, b) {
  return a / b;
}
// add
function greeting(msg) {
  return `Hello ${msg}!`;
}

module.exports = {
  addtion: add,
  subtraction: sub,
  multiply: mul,
  division: division,
  greeting: greeting,
};
