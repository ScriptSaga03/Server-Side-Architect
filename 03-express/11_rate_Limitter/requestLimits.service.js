import rateLimit from "express-rate-limit";

export const rateLimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many request! Please wait for 15 min.",
});

const limitter = (time, limit, msg) => {
  return rateLimit({
    windowMs:time,
    max:limit,
    message:msg
  });
};


export {limitter}
