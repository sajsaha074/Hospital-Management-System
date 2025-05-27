import mongoose from 'mongoose';

const patientSchema = mongoose.Schema(
    {
        pname: {
            type: String,
            required: true,
            trim: true,
        },
        pemail: {
            type: String,
            required: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please provide a valid email address"],
        },
        ppassword: {
            type: String,
            required: true,
        },
        page: {
            type: Number,
            required: true,
        },
        paddress: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        insuranceStatus: {
            type: Boolean,
        },
        dueAmount: {
            type: Number,
        },
        pAvailability: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

export const Patient = mongoose.model('Patient', patientSchema);
