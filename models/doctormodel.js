import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema(
    {
        dname: {
            type: String,
            required: true,
            trim: true,
        },
        demail: {
            type: String,
            required: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please provide a valid email address"],
        },
        dpassword: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
            trim: true,
        },
        dcapacity: {
            type: Number,
            required: true,
        },
        availableSlots: {
            type: String,
            required: true,
            trim: true,
        },
    }, {
        timestamps: true,
    });
    
    export const Doctor = mongoose.model('doctor', doctorSchema);