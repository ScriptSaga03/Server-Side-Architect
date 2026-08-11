

import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import customError from '../utils/customError.js';


const getAllDatabases = asyncHandler(async(req, res) =>{
    const adminDB =  mongoose.connection.db.admin();
    if(!adminDB){
        throw customError(404, 'Admin database not found!');
    }
    const dbList = await  adminDB.listDatabases();
    res.status(200).json({
        success:true,
        message:"✔ Database List :",
        dbList
    })

});

export default getAllDatabases;