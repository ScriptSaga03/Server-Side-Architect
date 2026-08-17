
import express from "express";
import seedData from "../controller/seed.js";




const router = express.Router();



// POST 
router.route("/")
        .post(seedData)


export default router