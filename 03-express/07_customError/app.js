

import express from 'express';
import errorHandler from './src/middlewares/errorHandler.js';
import userRoutes from './src/routes/userRoutes.js';
import createCustomError from './src/utils/createCustomError.js';

// create an express app
const app  = express();


// Global Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));





// Route mounting
app.use('/api', userRoutes);


// if route not found 
app.use((req, res, next) => {
    // const err = new Error(`❌ Can't find ${req.originalUrl}  on this server!`);
    // err.statusCode = 404;
    // next(err)
    const err = createCustomError(404, `Can't find ${req.originalUrl} on this server!`);
    next(err);
})

// Centralized Error Handler Middleware
app.use(errorHandler)

// Create PORT 
const PORT = process.env.PORT || 3000;
// start server listening 
app.listen(PORT, () => {
    console.log(`🚀 Express server is running on PORT : http://localhost:${PORT}`)
});










/*

3. Problem 3: "Token Blacklist / Logout System"
Scenario
JWT stateless hota hai, lekin production apps mein jab user logout karta hai, toh uske token ko invalidate karna zaroori hota hai.

Tasks
In-memory array banaein: const tokenBlacklist = [];.

Ek naya protected route banaein: POST /api/logout.

logout controller mein request header se Token extract karein aur use tokenBlacklist array mein push kar dein.

Apne isAuthenticated middleware ko update karein: Token verify karne se pehle check karein ki kya incoming token tokenBlacklist array mein exist karta hai?

Agar token blacklisted hai, toh 401 Unauthorized error throw/return karein: "Token has been revoked. Please login again!".

4. Problem 4: "Password Changed Timestamp Check"
Scenario
User ne apna password change kar liya hai, lekin purana stolen token abhi bhi active (valid signature) hai.

Tasks
Mock user object mein ek property rakhein:

JavaScript
passwordChangedAt: Date.now() // Milliseconds timestamp
isAuthenticated middleware mein JWT verify karne ke baad payload se decoded.iat (Issued At - in seconds) nikaalein.

Password change ki timestamp ko seconds mein convert karein: parseInt(user.passwordChangedAt / 1000, 10).

Check karein: Agar passwordChangedAtSeconds > decoded.iat (yani token password change hone se pehle issue hua tha), toh 401 Unauthorized error throw karein: "Password changed recently. Please login again!".

5. Problem 5: "Header Verification & Format Validation Guard"
Scenario
Aapke isAuthenticated middleware ko strict header format validation handle karni hai.

Tasks
req.headers.authorization check karein.

Agar Authorization header missing hai, toh 401 Unauthorized throw karein: "Authorization header is required".

Agar header exists karta hai lekin Bearer  prefix se start nahi hota (e.g., kisi ne sirf raw token bhej diya), toh 400 Bad Request throw karein: "Invalid token format. Must be 'Bearer <token>'".

Agar token part empty hai (Bearer  ke baad kuch nahi hai), toh 401 Unauthorized throw karein: "Token missing after Bearer prefix".

6. Problem 6: "Role-Based Resource Protection (Simple Role Guard)"
Scenario
System mein 2 types ke users hain: "user" aur "admin".

Tasks
JWT payload mein id ke saath role bhi embed karein: generateToken(user.id, user.role).

isAuthenticated middleware decode karke req.user = { id: decoded.id, role: decoded.role } attach kare.

Ek middleware function banayein authorizeAdmin:

JavaScript
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw createError(403, "Access denied! Admin privileges required.");
    }
    next();
};
Ek protected route banaein /api/admin/dashboard jo pehle isAuthenticated aur phir authorizeAdmin middleware se hoke guzre.

*/