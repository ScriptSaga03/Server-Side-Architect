
import express from 'express';
import { getAllProducts, insertSingleDoc } from '../controller/product_Controllers/productController.js';

const router = express.Router();



router.get("/", getAllProducts)
router.post("/single-product", insertSingleDoc);


export default router;


