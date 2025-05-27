import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
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
    specialization: {
        type: String,
        required: true,
        trim: true,
    },
    availableSlots: {
        type: String,
        
    },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
