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

// Search performance optimization
contactSchema.index({ userId: 1, name: 1 , phone: 1});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;