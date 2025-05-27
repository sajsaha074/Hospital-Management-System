import express from "express";
const router = express.Router();
import {Medicine} from "../models/medicinemodel.js";

router.post('/addMedicine', async (req, res) => {
    try {
        if(!req.body.f_id || !req.body.medicine_name || !req.body.exp_date || !req.body.quantity|| !req.body.price) {
            return res.status(400).send({
                message: "Please fillup the information form properly",
            });
        }
        const newMedicine = {
            f_id: req.body.f_id,
            medicine_name: req.body.medicine_name,
            exp_date: req.body.exp_date,
            quantity: req.body.quantity,
            price: req.body.price,
            
        };
        const medicine = await Medicine.create(newMedicine);
        console.log("Medicine added successfully");
        return res.status(201).send(medicine);
    } catch (error) {
        return res.status(400).send({
            messsage: error.message
        });
    }
});

router.get("/getMedicine", async (req, res) => {
    try {
        const medicine = await Medicine.find({});
        return res.status(200).json(medicine);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getMedicine/:f_id", async (req, res) => {
    try {
        const {f_id} = req.params;
        const medicine = await Medicine.findOne({f_id});
        if (medicine === null){
            return res.status(404).send({message: "Medicine not found!"});
        }
        return res.status(200).json(medicine);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getMedicines/:medicine_name", async (req, res) => {
    try {
        const {medicine_name} = req.params;
        const medicine = await Medicine.find({ medicine_name });
        if (medicine.length === 0){
            console.log(medicine.length);
            return res.status(404).send({message: "Medicine is not found with this name!"});
        }
        return res.status(200).json(medicine);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});



router.delete("/deleteMedicine/:f_id", async (req, res) => {
    try {
        const {f_id} = req.params;
        const result = await Medicine.findOneAndDelete({f_id});
        if (!result){
            return res.status(404).send({message: "Medicine not found!"});
        }
        return res.status(200).json({message: "Deleted successfully!"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});



// Route to update medicine quantity
router.put('/updateMedicineQuantity/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Find the medicine by ID
        const medicine = await Medicine.findById(id);

        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        if (medicine.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        // Decrease the quantity by the specified amount
        medicine.quantity -= quantity;

        // Save the updated medicine document
        await medicine.save();

        res.status(200).json({ message: "Medicine quantity updated", medicine });
    } catch (error) {
        console.error("Error updating medicine quantity:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});



export default router;