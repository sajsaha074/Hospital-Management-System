import express from "express";
const router = express.Router();
import { Ambulance } from "../models/ambulancemodel.js";

router.post('/addAmbulance', async (req, res) => {
    try {
        if (!req.body.f_id || !req.body.plate_no || !req.body.Type || !req.body.Time || !req.body.Price || req.body.availability === undefined) {
            return res.status(400).send({
                message: "Please fill up the information form properly",
            });
        }
        const newAmbulance = {
            f_id: req.body.f_id,
            plate_no: req.body.plate_no,
            Type: req.body.Type,
            Time: req.body.Time,
            Price: req.body.Price,
            availability: req.body.availability,
        };
        const ambulance = await Ambulance.create(newAmbulance);
        console.log("Ambulance added successfully");
        return res.status(201).send(ambulance);
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
});

router.get("/getAmbulance", async (req, res) => {
    try {
        const ambulance = await Ambulance.find({});
        return res.status(200).json(ambulance);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getAmbulance/:f_id", async (req, res) => {
    try {
        const { f_id } = req.params;
        const ambulance = await Ambulance.findOne({ f_id });
        if (ambulance === null) {
            return res.status(404).send({ message: "Ambulance not found!" });
        }
        return res.status(200).json(ambulance);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getambu/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const ambulance = await Ambulance.findById({ _id });
        if (ambulance === null) {
            return res.status(404).send({ message: "Ambulance not found!" });
        }
        return res.status(200).json(ambulance);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getAmbulances/:Type", async (req, res) => {
    try {
        const { Type } = req.params;
        const ambulance = await Ambulance.find({ Type });
        if (ambulance.length === 0) {
            console.log(ambulance.length);
            return res.status(404).send({ message: "Ambulance is not found with this type!" });
        }
        return res.status(200).json(ambulance);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/deleteAmbulance/:f_id", async (req, res) => {
    try {
        const { f_id } = req.params;
        const result = await Ambulance.findOneAndDelete({ f_id });
        if (!result) {
            return res.status(404).send({ message: "Ambulance not found!" });
        }
        return res.status(200).json({ message: "Deleted successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/updateAmbInfo/:f_id", async (req, res) => {
    const { f_id } = req.params;
    const { availability } = req.body; // Availability comes from the body

    try {
        // Find the ambulance by its ID
        const ambulance = await Ambulance.findOne({ f_id });

        // If ambulance not found, return an error response
        if (!ambulance) {
            return res.status(404).json({ message: "Ambulance not found" });
        }

        // Update the availability status
        ambulance.availability = availability;

        // Save the updated ambulance document
        await ambulance.save();

        // Return a success response
        res.status(200).json({ message: "Ambulance availability updated successfully", ambulance });
    } catch (error) {
        console.error("Error updating ambulance availability:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
