import mongoose from 'mongoose';

const duetrackingSchema = mongoose.Schema(
    {
        pemail: {
            type: String,
            required: true,
            trim: true,
        },
        total_due: {
            type: Number,
            required: true,
            trim: true,
        },
        deadline: {
            type: String,
            required: true,
            trim: true,
        }
        
    }, {
        timestamps: true,
    });
    
    export const DueTracking = mongoose.model('dueTrackers',duetrackingSchema );