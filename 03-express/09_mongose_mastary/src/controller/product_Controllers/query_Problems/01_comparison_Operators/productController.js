

import asyncHandler from '../../utils/asyncHandler.js';
import Product from '../../model/products.js';
import customError from '../../utils/customError.js';
import mongoose from 'mongoose';




// GET PRODUCTS BY ID
export const getProductById = asyncHandler(async (req, res) => {


    const { id } = req.params;
    console.log(`Id : ${id}`)
    // check id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw customError(400, "❌ Invalid Product Id format!")
    }


    // Fetched sinle product
    const product = await Product.findById(id).select("name category brand price stock rating -_id").lean();

    // 3. Null check
    if (!product) {
        throw customError(404, `❌ Product with ID ${id} not found!`);
    }

    // 4. Response
    return res.status(200).json({
        success: true,
        message: "✔ Product fetched successfully.",
        data: product
    });
});


// DELETE PRODUCT BY ID
export const removeProductById = asyncHandler(async (req, res) => {
    // Destructure `id` from req.params and rename to product id
    const { id: productId } = req.params;
    // CHECK IS ID CORRECT OR NOT
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw customError(400, "❌ Invalid Product ID")
    }


    // // Delete Product
    const product = await Product.findByIdAndDelete(productId);
    // If Product doesn't exist in DB
    if (!product) {
        throw customError(404, `❌ Product with ID ${productId} not found!`);
    }

    // Send Response (200 OK)
    return res.status(200).json({
        success: true,
        message: `✔ Product with ID ${productId} deleted successfully.`,
        data: product
    });


});



//  UPDATE PRODUCT BY ID 
export const updateProductByID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // 1. Check ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw customError(400, "❌ Invalid Product ID format!");
    }

    // 2. Check if req.body has updates
    if (!req.body || Object.keys(req.body).length === 0) {
        throw customError(400, "❌ Please provide at least one field to update!");
    }

    // 3. Update product in DB
    const product = await Product.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );

    // 4. Null check
    if (!product) {
        throw customError(404, `❌ Product with ID: ${id} not found!`);
    }

    // 5. Success Response
    return res.status(200).json({
        success: true,
        message: `✔ Product with ID: ${id} updated successfully.`,
        data: product
    });
});


// Find products whose price is greater than the given price
export const findProductByPrice = asyncHandler(async(req, res) => {
    const {search} = req.query;
     if (!search) {
        throw customError(400, "❌ Price query parameter is required!");
    }   

      const price = Number(search);


      if (Number.isNaN(price)) {
        throw customError(400, "❌ Price must be a valid number!");
    }


    const products = await Product.find({
        price: { $gt: price }
    })
        .select("name category price stock -_id")
        .lean();

       if (products.length === 0) {
        throw customError(404, "❌ No products found!");
    }

    return res.status(200).json({
        success: true,
        message: "✔ Fetched all products",
        count:products.length,
        data: products
    });
})


// stock Checker
export const stockChecker = asyncHandler(async(req, res) => {
    const {stock} = req.query;

    if(!stock){
        throw customError(400, "❌ stock query parameter is required!")
    };

    const s = Number(stock);
    if(Number.isNaN(s)){
        throw customError(400, "Please provide a valid number")
    }

    const products = await Product.find({
        stock :{$lte : s}
    }).select("name stock -_id");
    if(products.length === 0) {
        throw customError(404,"No products found!")
    }

    return res.status(200).json({
        success:true,
        message:'Product found successfully.',
        count:products.length,
        data:products
    })
})

// Rating filter

