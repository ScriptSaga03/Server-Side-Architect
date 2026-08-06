
import createCustomError from '../utils/createCustomError.js';
import users from "../config/users.js"


const registerUserController =  async(req, res, next) => {
    try {
        const {userName, email, password, age} = req.body;

        //  validation logic
        if(!req.body ||  Object.keys(req.body).length === 0){
            throw createCustomError(400, '⚠ Request body cannot be empty!')
        }

        // 2 Missing values
        if(!userName || !email || !password){
            throw createCustomError(400, '⚠ Bad Request : All fields are required!')
        }

        const isExist =  users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if(isExist){
            throw createCustomError(400, "User is already register, please login !")
        }

        if(age === undefined || age < 18){
            throw createCustomError(400, `⚠ User must be 18 years old!`)
        }

        

      const newUser = {
      id: users.length + 1,
      name: userName,
      email: email.toLowerCase(),
      password,
      age,
      isBlocked:false,
      role:'user',
      passwordChangesAt:null
    };


     users.push(newUser)

       // 4. Send Success Response (No next() after res.json)
    return res.status(201).json({
      success: true,
      message: '✔ User registered successfully.',
      data: {
        id:newUser.id,
        userName, 
        email,
        age,
        isBlocked:newUser.isBlocked,
        role:newUser.role,
        passwordChangesAt:newUser.passwordChangesAt
        
      }
    });

    } catch (error) {
        next(error)
    }
}

export default registerUserController;



/*

1. Problem 1: "The Empty Body & Validation Guard"
Scenario
Aapka /api/register route user se username, email, password, aur age accept karta hai.

Tasks
Ek validation logic likhein controller ke andar.

Agar req.body missing hai ya empty object {} hai, toh createError(400, "Request body cannot be empty!") throw karein.

Agar username, email, ya password mein se koi bhi missing hai, toh 400 Bad Request throw karein.

Agar age provided hai aur uski value 18 se kam hai, toh 400 Bad Request throw karein: "User must be at least 18 years old!".


*/