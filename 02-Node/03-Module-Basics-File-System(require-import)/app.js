

/*
Node.js mein modules do tarah ke hote hain:
Core Modules: Jo Node.js ke andar pehle se bane-banaye aate hain (Jaise os, fs, path).
Local Modules: Jo hum aur aap khud banate hain (Jaise database configuration ki file, routes, ya filters).



1. Code ko Ek File se Dusri File mein Kaise Le Jayein?
Node.js mein default roop se ek system use hota hai jise hum kehte hain CommonJS (require aur module.exports).
Maan lo aap ek E-commerce app bana rahe ho aur aapko products ke prices par discount calculate karne ka ek logic alag file mein rakhna hai.






node.js ke andar modules use karne ke do tarike hote hain:
1. CommonJS (Purana aur Default Tarika)
Syntax: require() aur module.exports

Ye Node.js ka shuru se default tarika raha hai.
2. ES Modules / ESM (Naya aur Modern Tarika)
Syntax: import aur export

Ye wahi tarika hai jo aap React.js mein use karte ho.

Agar aapke project ke package.json file mein "type": "module" likha hua hai, toh Node.js poore project mein sirf import/export hi samjhega. Agar aap wahan module.exports likhoge, toh wo turant wahi error dega jo aapko mila.





*/

// Kisi dusri file se maal mangwane ke liye use hota hai require()
// require ki jagah import use hoga aur .js extension lagana zaroori hai
import { calculateDiscount } from "./utils.js";
import { analyzeGrades } from "./logic.js";

const originalPrice = 1000;
let finalPrice = calculateDiscount(originalPrice, 20);

console.log('Original Price: ', originalPrice);
console.log('After discount: ', finalPrice);

let marks = [45, 85, 32, 77, 90, 28];
let finalResult = analyzeGrades(marks, 40);

console.log('Marks: ', marks);
console.log('Final Result: ', finalResult);


