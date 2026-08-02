

import jwt from 'jsonwebtoken';


export const JWT_SECRET =  process.env.JWT_SECRET || "mysecretkey123mehtab";



// token genrate krna 
export const generateToken = (userId) =>{
    return jwt.sign({id:userId} , JWT_SECRET, {expiresIn : '1h'})
}


