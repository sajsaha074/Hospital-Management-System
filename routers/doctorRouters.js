import express from "express";
const router = express.Router();
import {Doctor} from "../models/doctormodel.js";
import { Appointment } from "../models/appointmentmodel.js";

router.post('/addDoctor', async (req, res) => {
    try {
        if(!req.body.dname || !req.body.demail || !req.body.dpassword || !req.body.specialization || !req.body.dcapacity || !req.body.availableSlots) {
            return res.status(400).send({
                message: "Please fillup the information form properly",
            });
        }
        const newDoctor = {
            dname: req.body.dname,
            demail: req.body.demail,
            dpassword: req.body.dpassword,
            specialization: req.body.specialization,
            dcapacity: req.body.dcapacity,
            availableSlots: req.body.availableSlots,
        };
        const doctor = await Doctor.create(newDoctor);
        console.log("Doctor added successfully");
        return res.status(201).send(doctor);
    } catch (error) {
        if (error.code === 11000 || error.name === "ValidationError"){
            return res.status(400).send({
                messsage: "Your email is not valid or already exists.",
        });
        }
    }
});

router.get("/getDoctors", async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getDoctors/:demail", async (req, res) => {
    try {
        const {demail} = req.params;
        const doctors = await Doctor.findOne({demail});
        if (doctors === null){
            return res.status(404).send({message: "Doctor not found!"});
        }
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getDoc/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const doctors = await Doctor.findById({_id});
        if (doctors === null){
            return res.status(404).send({message: "Doctor not found!"});
        }
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getDoctor/:specialization", async (req, res) => {
    try {
        const {specialization} = req.params;
        const doctors = await Doctor.find({ specialization });
        if (doctors.length === 0){
            console.log(doctors.length);
            return res.status(404).send({message: "Doctor not found with this specialization!"});
        }
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.put("/updateDocInfo/:demail", async (req, res) => {
    try {
        const {demail} = req.params;
        const updateData = req.body;
        const result = await Doctor.findOneAndUpdate({demail}, updateData, {runValidators: true});
        if (!result){
            return res.status(404).send({message: "Doctor not found!"});
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.delete("/deleteDoc/:demail", async (req, res) => {
    try {
        const {demail} = req.params;
        const result = await Doctor.findOneAndDelete({demail});
        if (!result){
            return res.status(404).send({message: "Doctor not found!"});
        }
        return res.status(200).json({message: "Deleted successfully!"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.put("/reduceCapacity/:demail", async (req, res) => {
    try {
        const { demail } = req.params;

        const doctor = await Doctor.findOne({ demail });
        if (!doctor) {
            return res.status(404).send({ message: "Doctor not found!" });
        }

        if (doctor.dcapacity <= 0) {
            return res.status(400).send({ message: "Doctor capacity has reached its limit!" });
        }

        doctor.dcapacity -= 1;
        await doctor.save();

        return res.status(200).json({
            message: "Doctor capacity updated successfully!",
            updatedDoctor: doctor,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/rescheduleTiming/:demail", async (req, res) => {
    try {
        const { demail } = req.params;
        const { newSlots } = req.body;

        const doctor = await Doctor.findOne({ demail });
        if (!doctor) {
            return res.status(404).send({ message: "Doctor not found!" });
        }

        const bookedAppointments = await Appointment.find({ demail: demail });
        if (bookedAppointments.length > 0) {
            return res.status(400).send({
                message: "Cannot reschedule timing. There are patients with booked appointments.",
            });
        }

        doctor.availableSlots = newSlots;
        await doctor.save();

        return res.status(200).json({
            message: "Appointment timing rescheduled successfully!",
            updatedDoctor: doctor,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;