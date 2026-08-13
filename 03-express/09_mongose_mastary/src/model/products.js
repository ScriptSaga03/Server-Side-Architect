import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            minLength: [3, 'Name must be at least 3 characters']
        },
        brand: {
            type: String,
            trim: true,
            default: 'Generic'
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, "Price can't be negative"]
        },
        originalPrice: {
            type: Number,
            min: [0, "Original price can't be negative"]
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true
        },
        subcategory: {
            type: String,
            trim: true
        },
        stock: {
            type: Number,
            default: 0,
            min: [0, 'Stock cannot be negative']
        },
        ratings: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot be more than 5']
        },
        reviewsCount: {
            type: Number,
            default: 0,
            min: 0
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        discountPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        tags: [
            {
                type: String,
                trim: true
            }
        ],
        sizes: [
            {
                type: String,
                trim: true,
                default:"m"
            }
        ],
        colors: [
            {
                type: String,
                trim: true
            }
        ],
        status: {
            type: String,
            enum: ['Available', 'Out of Stock', 'Discontinued'],
            default: 'Available'
        },
        tempDiscount: Number,
        metadata: {
            type: Map,
            of: String
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;