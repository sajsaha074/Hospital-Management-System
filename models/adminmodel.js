import mongoose from 'mongoose';

const adminSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        adminpassword: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Admin = mongoose.model('Admin', adminSchema);