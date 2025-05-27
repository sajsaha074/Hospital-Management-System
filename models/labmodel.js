import mongoose from 'mongoose';

const labSchema = mongoose.Schema(
    {
        f_id: {
            type: Number,
            required: true,
            trim: true,
        },
        lab_no: {
            type: Number,
            required: true,
            trim: true,
        },
        test_type: {
            type: String,
            required: true,
            trim: true,
        },
        test_price: {
            type: Number,
            required: true,
        },

    });
    
    export const Lab = mongoose.model('lab', labSchema);