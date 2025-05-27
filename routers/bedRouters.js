import express from "express";
const router = express.Router();
import {Bed} from "../models/bedmodel.js";

router.post('/addBed', async (req, res) => {
    try {
        if(!req.body.f_id || !req.body.bed_no || !req.body.category || !req.body.status || !req.body.bed_price) {
            return res.status(400).send({
                message: "Please fillup the information form properly",
            });
        }
        const newBed = {
            f_id: req.body.f_id,
            bed_no: req.body.bed_no,
            category: req.body.category,
            status: req.body.status,
            bed_price: req.body.bed_price,
        };
        const bed = await Bed.create(newBed);
        console.log("Bed added successfully");
        return res.status(201).send(bed);
    } catch (error) {
        return res.status(400).send({
            messsage: error.message
        });
    }
});

router.get("/getBed", async (req, res) => {
    try {
        const bed = await Bed.find({});
        return res.status(200).json(bed);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getBed/:f_id", async (req, res) => {
    try {
        const {f_id} = req.params;
        const bed = await Bed.findOne({f_id});
        if (bed === null){
            return res.status(404).send({message: "Bed not found!"});
        }
        return res.status(200).json(bed);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

/*router.get("/getambu/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const ambulance = await Ambulance.findById({_id});
        if (ambulance === null){
            return res.status(404).send({message: "Ambulance not found!"});
        }
        return res.status(200).json(ambulance);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});*/

router.get("/getBeds/:category", async (req, res) => {
    try {
        const {category} = req.params;
        const bed = await Bed.find({ category });
        if (bed.length === 0){
            console.log(bed.length);
            return res.status(404).send({message: "Bed is not found with this Category!"});
        }
        return res.status(200).json(bed);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.put("/updateBedInfo/:f_id", async (req, res) => {
    try {
        const {f_id} = req.params;
        const updateData = req.body;
        const result = await Bed.findOneAndUpdate({f_id}, updateData, {runValidators: true});
        if (!result){
            return res.status(404).send({message: "Bed not found!"});
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.delete("/deleteBed/:f_id", async (req, res) => {
    try {
        const {f_id} = req.params;
        const result = await Bed.findOneAndDelete({f_id});
        if (!result){
            return res.status(404).send({message: "Bed not found!"});
        }
        return res.status(200).json({message: "Deleted successfully!"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;