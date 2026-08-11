
import asyncHandler from "../../utils/asyncHandler.js";
import Product from "../../model/products.js";



const createProducts = asyncHandler(async(req, res) => {
    const sampleProducts = [
        { name: "Wireless Mouse", price: 500, category: "Electronics", stock: 10, tags: ["tech", "accessories"] },
        { name: "Gaming Keyboard", price: 1500, category: "Electronics", stock: 0, tags: ["tech", "gaming"] },
        { name: "Cotton T-Shirt", price: 800, category: "Apparel", stock: 0, tags: ["fashion", "menswear"] },
        { name: "Running Shoes", price: 2500, category: "Apparel", stock: 5, tags: ["footwear"] }
    ];


    const products = await Product.insertMany(sampleProducts);
    return res.status(201).json({
        success:true,
        message: `✔ Products inserted successfully`,
        count : products.length,
        data:products
    })
});
export default createProducts;