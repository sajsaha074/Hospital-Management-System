import mongoose from 'mongoose';

const medicineSchema = mongoose.Schema(
    {
        f_id: {
            type: Number,
            required: true,
            trim: true,
        },
        medicine_name: {
            type: String,
            required: true,
            trim: true,
        },
        exp_date: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
       
    });
    
    export const Medicine = mongoose.model('medicine', medicineSchema);