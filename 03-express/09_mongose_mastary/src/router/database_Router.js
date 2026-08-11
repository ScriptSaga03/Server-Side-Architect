
import express from 'express';
import getAllDatabases from '../controller/getAllDatabases.js';
import getCollections from '../controller/getCollections.js';
import createProducts from '../controller/products_controllers/createProducts.js';
import getAllProducts from '../controller/products_controllers/getAllProducts.js';
import { dropProductCollection } from '../controller/products_controllers/dropProductCol.js';

const router = express.Router();



router.get("/", (req, res) => {
    res.json({
        message:"✔ Mongoose Mastary in Express.JS"
    })
})


router.get("/database-list", getAllDatabases);
router.get('/collection-list', getCollections);
router.get('/read-products', getAllProducts);
router.post("/create-products", createProducts)
router.delete("/drop-product-collection", dropProductCollection)

export default router;


