import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";



const getCollections = asyncHandler(async(req, res) => {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
   res.status(200).json({
        success: true,
        count: collectionNames.length,
        collections: collectionNames
    });
})

export default getCollections