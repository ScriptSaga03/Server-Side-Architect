import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Product name is required"],
        trim:true,
        minLength:[3, "Name must be atleas 3 character"]
    },
    price:{
        type:Number,
        required:[true, "Price is required"],
        min:[0,"Price can't be negative"]
    },
    category:{
        type:String,
        required:[true, "Category is required"],
        trim:true
    },
    stock:{
        type:Number,
        default:0,
        min:[0, "Stock cannot be negative"]
    },
    tags:[String],
    tempDiscount:Number,

},{
    timestamps:true
});

const Product = mongoose.model('Product', productSchema);
export default Product;