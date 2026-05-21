
/*

ehle ek sach jaan lo: JavaScript Single-Threaded hai.

💡 Thread kya hota hai? Ek thread ka matlab hai ek single rasta ya ek akela worker jo ek baar mein sirf ek hi kaam kar sakta hai. Agar ek kaam chal raha hai, toh dusra kaam line mein khada rahega (ise sync ya blocking kehte hain).

Ab dimaag mein sawal aata hai: Agar Node.js single-threaded hai, toh jab ek sath lakhon log Amazon ya kisi badi website par request bhejte hain, toh server crash kyun nahi hota? Wo ek sath itne saare kaam kaise kar leta hai?

Iska jawab chhupa hai do cheezon mein: V8 Engine aur Libuv Library.

Node.js ke Piche ka Real Architecture
Node.js ke andar do sabse bade pillars hote hain:

V8 Engine (Google ka): Iska kaam hai aapke JS code ko samajhna aur use machine code (0101) mein convert karna taaki computer use chala sake.

Libuv (C++ Library): Ye Node.js ka asli baahubali hai. Ye C++ mein likhi gayi ek library hai jo Node.js ko Event Loop aur Thread Pool deti hai. Iska kaam hai piche ke saare bhaari kaam (jaise file read karna, database se connect hona, internet se data lana) sambhalna.

🔄 The Event Loop (Simple Kahani)
Chalo ek simple hotel ki kahani se samajhte hain:

The Waiter (Single Thread / Event Loop): Hotel mein sirf ek hi waiter hai. Wo sabhi tables se order leta hai.

The Kitchen (Thread Pool / Web APIs): Kitchen mein bohot saare chefs (multiple threads) hain jo khana banate hain.

Kaam kaise hota hai?
Waiter table 1 par gaya, order liya, aur kitchen mein chef ko de diya (chef ko khana banane mein 15 mins lagenge). Ab waiter wahan khada hokar 15 mins waste nahi karega!
Wo turant table 2 par jayega, unka order lega, aur use bhi kitchen mein de dega.
Jaise hi table 1 ka khana ready hoga, kitchen se bell bajegi (Callback). Waiter jaakar khana table 1 ko serve kar dega.

Node.js bhi bilkul aise hi kaam karta hai! Jo kaam time lene wale hote hain (jaise database se data lana), Node.js unhe piche Libuv (kitchen) ko de deta hai aur khud aage badh jaata hai naye requests lene. Jab kaam khatam ho jata hai, toh ek Callback Function ke zariye wo data wapas mil jata hai. Is mechanism ko kehte hain Non-blocking I/O (Input/Output).

*/


console.log("1. Waiter ne Pehla Order liya (Start) 📝");

// Yeh kaam background mein chala jayega (2 seconds ke liye)
setTimeout(() => {
    console.log("3. Table 1 ka khana ready ho gaya aur serve ho gaya! 🍲 (2000ms baad)");
}, 2000);

// Yeh kaam bina kisi delay ke turant chalega
setTimeout(() => {
    console.log("4. Table 2 ka fast-food ready! 🍔 (0ms delay)");
}, 0);

console.log("2. Waiter naye orders lene ke liye ready hai (End) 🏃‍♂️");


/*
1) 1. water ne pehla order liya (start)
2) 2. water naye orders lene ke liye ready hai (End)
3) 4. table 2 ka fast food ready hai 
4) 3. table 1 ka khana ready ho gaya aur serve ho gya
*/


// challenge
let mixedArr = [10, "Node", 25, "React", 5, "Backend", 40];

function filtered(arr) {
  let num = [];
  let str = [];

  for (let i = 0; i < arr.length; i++) {
    // 1. Agar type "number" hai toh numbers wale array mein daalo
    if (typeof arr[i] === "number") {
      num.push(arr[i]);
    } 
    // 2. Agar type "string" hai toh strings wale array mein daalo
    else if (typeof arr[i] === "string") {
      str.push(arr[i]);
    }
  }

  // Timeout ko hum 0ms kar dete hain taaki architecture check ho sake
  setTimeout(() => {
    console.log('🎯 Background task successfully completed!');
  }, 0);
  
  return {
    numbers: num,
    char: str
  };
}

console.log(filtered(mixedArr));




/*
🧐 Output aur Asli Khel (Architecture Check)
Jab aap is sahi code ko run karoge, toh terminal par output ka order dekhna:

Pehle print hoga aapka return kiya hua data: { numbers: [ 10, 25, 5, 40 ], char: [ 'Node', 'React', 'Backend' ] }

Uske BAAD sabse aakhir mein print hoga: 🎯 Background task successfully completed!

Aisa kyun hua? Dhyaan se samjho:
Aapne setTimeout ko 0 millisecond ka delay diya tha, fir bhi wo pehle nahi chala. Kyunki jab tak JavaScript ka main engine poore loop ko chala kar, function ko khatam karke, console.log(filtered(mixedArr)) ko screen par print nahi kar deta (yaani main thread khali nahi ho jata), tab tak Event Loop background task ko queue se nikaal kar execute nahi karta.
*/


