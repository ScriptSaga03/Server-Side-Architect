console.log("===================================");
console.log("   Hey there! I'm NodeJS Developer.    ");
console.log("===================================");


const customfnc = require("./01_Import&Export");
const {addtion, multiply, division, subtraction,greeting} = require("export.js");

console.log(customfnc.addtion(8, 9));
console.log(customfnc.subtraction(8, 9));
console.log(customfnc.multiply(8, 9));
console.log(customfnc.division(8, 9));
console.log(customfnc.greeting("Mehtab"));

console.log(addtion(8,6));
