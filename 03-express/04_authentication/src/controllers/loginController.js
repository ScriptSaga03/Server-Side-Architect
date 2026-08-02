
import users from "../config/userData.js";
import { generateToken } from "../helpers/jwt.js";

const data = [...users]


export const loginUserController = (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Check if both fields exist
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required!" 
            });
        }

        // 2. Find user from array
        const user = data.find((u) => u.email === email && u.password === password);


        // 3. If user not found, return credentials error
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "Wrong credentials!" 
            });
        }

        // 4. Generate token with actual user.id
        const token = generateToken(user.id);

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token: `${token}`
        });

    } catch (error) {
        next(error)
    }
}



