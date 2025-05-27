import express from "express";
const router = express.Router();
import {Lab} from "../models/labmodel.js";

router.post('/addLab', async (req, res) => {
    try {
        if(!req.body.f_id || !req.body.lab_no || !req.body.test_type || !req.body.test_price) {
            return res.status(400).send({
                message: "Please fillup the information form properly",
            });
        }
        const newLab = {
            f_id: req.body.f_id,
            lab_no: req.body.lab_no,
            test_type: req.body.test_type,
            test_price: req.body.test_price,
        };
        const lab = await Lab.create(newLab);
        console.log("Lab added successfully");
        return res.status(201).send(lab);
    } catch (error) {
        return res.status(400).send({
            messsage: error.message
        });
    }
});

router.get("/getLab", async (req, res) => {
    try {
        const lab = await Lab.find({});
        return res.status(200).json(lab);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getLab/:f_id", async (req, res) => {
    try {
        const {f_id} = req.params;
        const lab = await Lab.findOne({f_id});
        if (lab === null){
            return res.status(404).send({message: "Lab not found!"});
        }
        return res.status(200).json(lab);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getLab_no/:lab_no", async (req, res) => {
    try {
        const {lab_no} = req.params;
        const lab = await Lab.find({lab_no});
        if (lab.length === 0){
            console.log(lab.length);
            return res.status(404).send({message: "Lab is not found with this Lab Number!"});
        }
        return res.status(200).json(lab);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/getLabs/:test_type", async (req, res) => {
    try {
        const {test_type} = req.params;
        const lab = await Lab.find({ test_type });
        if (lab.length === 0){
            console.log(lab.length);
            return res.status(404).send({message: "Lab is not found with this Test type!"});
        }
        return res.status(200).json(lab);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.put("/updateLabInfo/:f_id", async (req, res) => {
    try {
        const {f_id} = req.params;
        const updateData = req.body;
        const result = await Bed.findOneAndUpdate({f_id}, updateData, {runValidators: true});
        if (!result){
            return res.status(404).send({message: "Lab not found!"});
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.delete("/deleteLab/:f_id", async (req, res) => {
    try {
        const {f_id} = req.params;
        const result = await Lab.findOneAndDelete({f_id});
        if (!result){
            return res.status(404).send({message: "Lab not found!"});
        }
        return res.status(200).json({message: "Deleted successfully!"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;