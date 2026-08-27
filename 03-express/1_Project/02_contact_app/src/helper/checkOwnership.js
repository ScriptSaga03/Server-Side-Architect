import customError from "../utils/customError.js";

export const checkOwnershipGuard = (resourceUserId, loggedInUserId) => {
    if (resourceUserId.toString() !== loggedInUserId.toString()) {
        throw customError(403, "🚫 Unauthorized! You do not own this contact."); // 🔒 Fix: throw error directly
    }
};