const { version } = require("os");

console.log("Listen : NodeJS running on server🚀");

try {
  alert("Is it running");
} catch (err) {
  console.log("\n ❌Error: You can't run DOM in NODEJS");
  console.error("reason:", err.message);
}

console.log("\n global object: ", global.process.version);

// challenge 1
let arr = [12, 45, 7, 23, 56, 89];
function getNumber(arr) {
  let maxNum = arr[0];
  let minNum = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxNum) maxNum = arr[i]
    if(arr[i] < minNum) minNum = arr[i];
  }

  let systemBit = global.process.arch
  return {
    highest: maxNum,
    lowest: minNum,
    version: systemBit
  };
}




console.log(getNumber(arr));


console.log("Global Object",global)


console.log('Hello');
global.console.log('Hello Mehtab!');


global.myName = 'Mehtab';
console.log(global);


// 2 challenge


let mixedArr = [10, "Node", 25, "React", 5, "Backend", 40];
function filtered(arr){
  let num = [];
  let str = [];
  for(let i = 0 ; i < arr.length; i++){
    if(typeof arr[i] === "number")num.push(arr[i])
    if(typeof arr[i] === "string") str.push(arr[i]);
  }
  
  return {
    numbers: num,
    char:str
  }
  
}

console.log(filtered(mixedArr))



/*
Server par koi screen nahi hoti, koi browser ki khidki (window) nahi hoti. Isiliye Node.js waalon ne kaha: "Hum window naam hata rahe hain, aur iska seedha saadha naam rakhenge global."
Node.js ke andar sabse bada dabba global hai.
Jo kaam browser mein window karta hai, wahi kaam Node.js mein global karta hai.
Isiliye jab aapne code mein global.process.version likha, toh aapne Node.js ke us sabse bade dappe (global) se bola: "Bhai, tere andar ek process naam ki diary hai, usme se mujhe computer ka metadata nikal ke de."
*/

