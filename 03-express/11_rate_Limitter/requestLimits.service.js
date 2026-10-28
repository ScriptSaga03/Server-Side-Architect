import rateLimit from "express-rate-limit";


// method 1:  Basic and static
export const rateLimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many request! Please wait for 15 min.",
});


// method 2 :  reusable function 
const limitter = (time, limit, msg) => {
  return rateLimit({
    windowMs:time,
    max:limit,
    message:msg
  });
};



// Method 3 :  resuable +  proper json response industry standard
import rateLimit from "express-rate-limit";

const createLimiter = (windowMs, maxRequests, errorMessage) => {
  return rateLimit({
    windowMs,
    limit: maxRequests,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 60,

    handler: (req, res, next, options) => {
      return res.status(429).json({
        success: false,
        message: errorMessage,
        retryAfterMinutes: Math.ceil(windowMs / (60 * 1000)),
      });
    },
  });
};

// LOGIN LIMITER
const loginLimiter = createLimiter(
  15 * 60 * 1000,
  5,
  "Too many requests! Please try after 15mins",
);

// PRODUCT LIMITER
const getProductLimiter = createLimiter(
  60 * 60 * 1000,
  100,
  "Too many requests.",
);

export { loginLimiter, getProductLimiter };



// LOGIN
router.post("/login",loginLimiter,loginValidationRules, validationMiddleware, login);


export {limitter}
