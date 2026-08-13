

import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || `mongodb+srv://mehtab185198131:mehtab13582012@mehtabclusterdb.jdk3a.mongodb.net/storeDB?retryWrites=true&w=majority`);
        console.log(`
            ✔ MongoDB Connected : 
            ${conn.connection.host} : 
            Database Name : ${conn.connection.name}`
        );

    } catch (error) {
        console.error(`❌ DB Connection Error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDB;