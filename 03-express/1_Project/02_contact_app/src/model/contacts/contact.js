import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Contact must belong to a user']
        },
        name: {
            type: String,
            required: [true, 'Contact name is required'],
            trim: true,
            lowercase:true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true
        },
        category: {
            type: String,
            enum: ['personal', 'work', 'other'],
            default: 'personal'
        }
    },
    { timestamps: true }
);



// 1. For Category Filter + Sort by CreatedAt / Name
contactSchema.index({ userId: 1, category: 1, createdAt: -1 });
contactSchema.index({ userId: 1, category: 1, name: 1 });

// 2. For Text/Search Queries (Name & Phone Search)
contactSchema.index({ userId: 1, name: 1 });
contactSchema.index({ userId: 1, email: 1 });
contactSchema.index({ userId: 1, phone: 1 });
const Contact = mongoose.model('Contact', contactSchema);
export default Contact;