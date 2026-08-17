import customError from "../utils/customError.js";

const notFound = (req, res, next) => {
    next(customError(404, `❌ Can't find ${req.originalUrl} on this server!`));
};

export default notFound;