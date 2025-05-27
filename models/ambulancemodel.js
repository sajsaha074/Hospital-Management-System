import mongoose from 'mongoose';

const ambulanceSchema = mongoose.Schema(
    {
        f_id: {
            type: Number,
            required: true,
            trim: true,
        },
        plate_no: {
            type: String,
            required: true,
            trim: true,
        },
        Type: {
            type: String,
            required: true,
            trim: true,
        },
        Time: {
            type: String,
            required: true,
            trim: true,
        },
        Price: {
            type: Number,
            required: true,
        },
        availability: {
            type: Boolean,
            required: true,
        },
    });
    
    export const Ambulance = mongoose.model('ambulance', ambulanceSchema);