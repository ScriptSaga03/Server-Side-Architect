


import mongoose from 'mongoose';
import asyncHandler from '../../utils/asyncHandler.js';
import customError from '../../utils/customError.js';
import Product from '../../model/products.js';




export const insertSingleDoc = asyncHandler(async (req, res) => {
    const {
        name,
        brand,
        price,
        originalPrice,
        category,
        subcategory,
        stock,
        ratings,
        reviewsCount,
        isFeatured,
        isActive,
        discountPercentage,
        tags,
        colors
    } = req.body;

    // MANDATORY FIELD VALIDATON
    if (!name || !brand || price === undefined || !category) {
        throw customError(400, "❌ name , brand, price and category are reqired fields!")
    };

    // BUSINESS LOGIC: CHECK DUPLICATE PRODUCT NAME
    const existingProduct = await Product.findOne({ name: name.trim() });
    if (existingProduct) {
        throw customError(409, `❌Product with name ${name} already exists`);
    }


    // Generate CLEAN SLUG 
    const generatedSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    // create document 
    const newProduct = await Product.create(
        {
            name: name.trim(),
            slug: generatedSlug,
            brand: brand.trim(),
            price,
            originalPrice,
            category: category.trim(),
            subcategory: subcategory?.trim(),
            stock: stock ?? 0,
            ratings: ratings ?? 0,
            reviewsCount: reviewsCount ?? 0,
            isFeatured: isFeatured ?? false,
            isActive: isActive ?? true,
            discountPercentage: discountPercentage ?? 0,
            tags: Array.isArray(tags) ? tags.map(t => t.trim().toLowerCase()) : [],
            colors: Array.isArray(colors) ? colors.map(c => c.trim()) : []
        }
    )


    // response
    return res.status(201).json({
        success:true, 
        message:"✔ Single product created successfully",
        data:newProduct
    })

});




// Get All Products
export const getAllProducts = asyncHandler(async(req, res) => {

    const {
        page =1, 
        limit=10, 
        category,
        minPrice,
        maxPrice,
        sort
    } = req.query

    const pageNum = Math.max(1,+page);
    const limitNum =Math.max(1 ,+limit);
    const skip = (pageNum - 1) * limitNum ;

    

    // filtering
    const query = {}
    if(category){
        query.category = {$regex: category , $options:"i"};
    }

   // Price Range Filter with NaN Check
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice && !isNaN(minPrice)) {
            query.price.$gte = Number(minPrice); // http://localhost:8000/mongodb?minPrice=3000
        }
        if (maxPrice && !isNaN(maxPrice)) {
            query.price.$lte = Number(maxPrice);  // http://localhost:8000/mongodb?maxPrice=5000
        }

        // http://localhost:8000/mongodb?minPrice=3000&maxPrice=5000
    }


    // Sorting Logic
const sortingOption = {};

if (sort === "price-asc") {
    sortingOption.price = 1;
} else if (sort === "price-desc") {
    sortingOption.price = -1;
} else if (sort === "ratings-asc") {
    sortingOption.ratings = 1;
} else if (sort === "ratings-desc") {
    sortingOption.ratings = -1;
} else if (sort === "oldest") {
    sortingOption.createdAt = 1;
} else {
    // ✅ User ne sort remove kar diya YA "latest" pass kiya: Default = Newest First
    sortingOption.createdAt = -1;
}

    const products = await Product.find(query).sort(sortingOption).skip(skip).limit(limitNum);

    return res.status(200).json({
        success:true,
        message:"✔ Fetched all products successfully.",
        count:products
        .length,
        data:products
    })
})