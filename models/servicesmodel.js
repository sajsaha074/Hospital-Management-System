import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
    {
        f_id: {
            type: Number,
            required: true,
            trim: true,
        },
        service_type: {
            type: String,
            required: true,
            trim: true,

        },
        item_name: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            trim: true,
        },
        total_price: {
            type: Number,
            required: true,
            trim: true,
        },
        pemail: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: String,
            required: true,
            trim: true,
        },
    }, {
        timestamps: true,
    });
    
    export const Service = mongoose.model('services', serviceSchema);