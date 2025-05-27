import mongoose from 'mongoose';

const bedSchema = mongoose.Schema(
    {
        f_id: {
            type: Number,
            required: true,
            trim: true,
        },
        bed_no: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: Boolean,
            required: true,
        },

        bed_price: {
            type: Number,
            required: true,
        },

    });
    
    export const Bed = mongoose.model('bed', bedSchema);