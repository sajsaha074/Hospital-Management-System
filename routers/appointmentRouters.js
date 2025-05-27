import express from "express";
const router = express.Router();
import { Appointment } from "../models/appointmentmodel.js";
import {Doctor} from "../models/doctormodel.js";
import {Patient} from "../models/patientmodel.js";

router.post('/addAppointment', async (req, res) => {
    try {
        if (!req.body.pname || !req.body.pemail || !req.body.dname || !req.body.demail || !req.body.specialization || !req.body.availableSlots) {
            return res.status(400).send({
                message: "Please fill up the information form properly",
            });
        }
        const newAppointment = {
            pname: req.body.pname,
            pemail: req.body.pemail,
            dname: req.body.dname,
            demail: req.body.demail,
            specialization: req.body.specialization,
            availableSlots: req.body.availableSlots,
        };
        const appointment = await Appointment.create(newAppointment);
        return res.status(201).send(appointment);
    } catch (error) {
        if (error.code === 11000 || error.name === "ValidationError") {
            return res.status(400).send({
                message: "Your email is not valid or already exists in an appointment.",
            });
        }
        return res.status(500).send({
            message: "An error occurred while creating the appointment.",
        });
    }
});

router.get("/getAppointment", async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        return res.status(200).json(appointments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getAppointments/:demail", async (req, res) => {
    try {
        const { demail } = req.params;
        const appointments = await Appointment.find({ demail });
        if (appointments.length === 0) {
            return res.status(404).send({ message: "No appointments found!" });
        }
        return res.status(200).json(appointments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getAppointment/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const appointments = await Appointment.find({ pemail });
        if (appointments.length === 0) {
            return res.status(404).send({ message: "No appointments found!" });
        }
        return res.status(200).json(appointments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/updateAppointInfo/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const updateData = req.body;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send({ message: "Update data cannot be empty!" });
        }
        const result = await Appointment.findOneAndUpdate(
            { pemail },
            updateData,
            { runValidators: true, new: true }
        );
        if (!result) {
            return res.status(404).send({ message: "Appointment not found!" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/deleteAppoint/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const result = await Appointment.findOneAndDelete({ pemail });
        if (!result) {
            return res.status(404).send({ message: "Appointment not found!" });
        }
        return res.status(200).json({ message: "Canceled successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/deleteAppointment/:demail", async (req, res) => {
    try {
        const { demail } = req.params;
        const result = await Appointment.findOneAndDelete({ demail });
        if (!result) {
            return res.status(404).send({ message: "Appointment not found!" });
        }
        return res.status(200).json({ message: "Checked successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/increaseCapacity/:demail", async (req, res) => {
    try {
        const { demail } = req.params;
        const doctor = await Doctor.findOne({ demail });

        if (!doctor) {
            return res.status(404).send({ message: "Doctor not found!" });
        }

        doctor.dcapacity += 1;
        await doctor.save();
        return res.status(200).send({ message: "Doctor's capacity updated!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});


export default router;
