
import createCustomError from '../utils/createCustomError.js';
import users from "../config/users.js"


const registerUserController =  async(req, res, next) => {
    try {
        const {userName, email, password, age} = req.body;

        //  validation logic
        if(!req.body ||  Object.keys(req.body).length === 0){
            throw createCustomError(400, '⚠ Request body cannot be empty!')
        }

        // 2 Mission values
        if(!userName || !email || !password){
            throw createCustomError(400, '⚠ Bad Request : All fields are required!')
        }

        if(!age || age < 18){
            throw createCustomError(400, `⚠ User must be 18 years old!`)
        }

      const newUser = {
      id: users.length + 1,
      name: userName,
      email,
      password,
      age
    };


     users.push(newUser)

       // 4. Send Success Response (No next() after res.json)
    return res.status(201).json({
      success: true,
      message: '✔ User registered successfully.',
      data: {
        userName, 
        email,
        age
      }
    });

    } catch (error) {
        next(error)
    }
}

export default registerUserController;
