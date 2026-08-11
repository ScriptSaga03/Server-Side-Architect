import asyncHandler from "../../utils/asyncHandler.js";
import Product from "../../model/products.js";
import customError from "../../utils/customError.js";



const getAllProducts = asyncHandler(async(req, res) => {
    const products =  await Product.find();
    if(!products || products.length === 0) {
        throw customError(400,"collection not found!");
    }
    return res.status(200).json({
        success:true,
        message:"✔ Products found in DB",
        count: products.length,
        data: products
    })
});
export default getAllProducts;