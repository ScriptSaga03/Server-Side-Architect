Rate Limiting kisi bhi web application ya API ko DDoS attacks, brute-force login attempts, 
aur API abuse (bot traffic) se bachane ke liye sabse zaroori security mechanism hai.
Express.js me ise implement karne ke liye sabse popular package express-rate-limit hai.1.

What (Kya hai Rate Limiting?)
Rate Limiting ka matlab hai kisi specific IP address se aane wali Requests par ek Limit lagana (e.g., "15 min me maximum 100 requests").
Agar koi user/bot is limit ko cross karta hai, toh server uski further requests ko reject kar deta hai (429 Too Many Requests status code ke saath).


2. Why (Kyu zaroorat hai?)
3. Security: Brute-force attacks ko rokta hai (jaise koi password guess karne ke liye hazaron requests bhej raha ho).
4. Cost & Resource Protection:
5.  Database queries aur server CPU load ko control karta hai.
6.  Prevention of API Abuse:
7.  Web scraping aur spamming ko rokta hai.3. Practical Setup & Implementation1
8.  .Package Install Karein:
9.  Terminal.Pehle npm se express-rate-limit package install karein:
11.  npm install express-rate-limit

12.  
2.Rate Limiter Middleware Define Karein:
middleware/rateLimiter.js.Ek reusable rate limiter banaen:JavaScriptconst rateLimit = require('express-rate-limit');

// Basic Limiter (Global APIs ke liye)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: 100, // Har IP se maximum 100 requests allowed hain
  message: {
    success: false,
    message: 'Bohot saari requests aa gayi hain! Please 15 min baad try karein.',
  },
  standardHeaders: true, // `RateLimit-*` headers return karega
  legacyHeaders: false, // `X-RateLimit-*` headers disable karega
});

// Strict Limiter (Sensitive routes ke liye jaise Login / Register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 5, // 15 minute me sirf 5 attempts!
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

module.exports = { apiLimiter, authLimiter };
3.Express App Me Apply Karein:
app.js.Aap ise poori app par ya specific routes par apply kar sakte hain:
JavaScriptconst express = require('express');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');
const asyncHandler = require('./utils/asyncHandler');

const app = express();
app.use(express.json());

// 1. Entire API par Global Limiter apply karna
app.use('/api/', apiLimiter);

// 2. Sensitive route par Strict Limiter apply karna
app.post('/api/auth/login', authLimiter, asyncHandler(async (req, res) => {
  // Login Logic
  res.json({ message: "Login Successful!" });
}));

app.listen(3000, () => console.log('Server running on port 3000'));
Best Practices 🔥PracticeDetailsReverse Proxy (Nginx/Cloudflare)Agar aap Nginx ya Cloudflare use kar rahe ho, toh app.set('trust proxy', 1) add zaroor karein taaki sahi IP address trace ho sake.Redis Store (Production)Memory Store default hota hai (single server ke liye). Agar distributed/cluster servers hain, toh rate-limit-redis store use karein.
