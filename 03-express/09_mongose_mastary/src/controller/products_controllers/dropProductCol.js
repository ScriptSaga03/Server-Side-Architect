

import Product from "../../model/products.js";
import asyncHandler from "../../utils/asyncHandler.js";


export const dropProductCollection = asyncHandler(async(req, res) => {
    const collectionDrop = await Product.collection.drop()   ;

    return res.status(200).json({
        message:'Product collectoin drop successfully'
    })
})
