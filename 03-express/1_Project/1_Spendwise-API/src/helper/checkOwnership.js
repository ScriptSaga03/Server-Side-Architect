import customError from "../utils/customError.js";

export const checkOwnership = (resourceUserId, loggedInUserId) => {
    if (resourceUserId.toString() !== loggedInUserId.toString()) {
        throw customError(403, "🚫 Unauthorized! You can only access your own resources.");
    }
};