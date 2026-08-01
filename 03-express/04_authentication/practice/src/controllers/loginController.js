import { generateToken} from '../../../src/helpers/jwt.js';

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) All fields required (400 Bad Request)
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: '⚠ Email and Password are required'
            });
        }

        // 2) Verify Credentials (401 Unauthorized)
        if (email !== "mehtab@gmail.com" || password !== "123456") {
            return res.status(401).json({
                success: false,
                message: "Wrong credentials!"
            });
        }

        // Dummy User Data
        const user = {
            _id: "user_67890",
            email: email,
            role: "admin"
        };

        // 3) Generate Token
        const token = generateToken(user);

        // 4) Send Success Response
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};

export default loginController;