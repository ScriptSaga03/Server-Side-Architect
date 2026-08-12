import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import customError from '../utils/customError.js';

export const getAllDatabase = asyncHandler(async (req, res) => {
    const db = mongoose.connection.db;
    if (!db) {
        throw customError(500, "❌ Database is not initialized!");
    }

    const adminDb = db.admin();
    if (!adminDb) {
        throw customError(500, "❌ Admin database reference not found!");
    }

    const dbList = await adminDb.listDatabases();

    return res.status(200).json({
        success: true,
        message: "✔ Fetched all databases successfully!",
        count: dbList.databases.length,
        databases: dbList.databases
    });
});

export const removeDatabase = asyncHandler(async (req, res) => {
    // 1 Query Parameter Extraction
    const { dbName } = req.params;
    if (!dbName || dbName.trim() === "") {
        throw customError(400, `Database name query is required`)
    };


    // Protect System Database
    const systemDB = ["admin", "local", "config"];
    if (systemDB.includes(dbName)) {
        throw customError(403, "System Database cannot be dropped!")
    };

    const db = mongoose.connection.db;
    if(!db){
        throw customError(500, "Database is not initialized!")
    }

    const adminDB = db.admin();
    if(!adminDB){
        throw customError(500, "Admin Database reference is not found!")
    };

    // check if db exist 
    const {databases} = await adminDB.listDatabases();
    const dbExist = databases.some(db => db.name.toLowerCase() === dbName.toLowerCase());
    if(!dbExist){
        throw customError(404, `Database ${dbName}  does not exist!`)
    }

    const targetDb = mongoose.connection.useDb(dbName);
    await targetDb.dropDatabase();

    return res.status(200).json({
        success:true,
        message: `Database ${dbName} dropped successfully.`
    })



});


// create database and collection
export const createDb= asyncHandler(async(req, res) => {
    const {databaseName} = req.params;

   if (!databaseName || databaseName.trim() === "") {
        throw customError(400, "Database name URL parameter is required!");
    }

    // Protect system database names from creation
    const systemDB = ["admin", "local", "config"];
    if (systemDB.includes(databaseName.toLowerCase())) {
        throw customError(400, "Cannot use system database names!");
    }



    // Switch to target DB
    const targetDb = mongoose.connection.useDb(databaseName);

    const defaultCollection = targetDb.collection('init-meta');
    await defaultCollection.insertOne({
        created_at: new Date(), 
        info: "Initial document to instantiate database"
    })

    return res.status(201).json({
        success: true,
        message: `Database '${databaseName}' created successfully with initial collection!`
    });
})
