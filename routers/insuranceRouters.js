import express from "express";
const router = express.Router();
import { Insurance } from "../models/insurancemodel.js";

router.post('/addClaim', async (req, res) => {
    try {
        if (!req.body.pname || !req.body.pemail || !req.body.claimDetails) {
            return res.status(400).send({
                message: "Please fill up the information form properly",
            });
        }
        const newClaim = {
            pname: req.body.pname,
            pemail: req.body.pemail,
            claimDetails: req.body.claimDetails,
        };
        const claim = await Insurance.create(newClaim);
        return res.status(201).send(claim);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                message: "Validation error: " + error.message,
            });
        }
        return res.status(500).send({
            message: "An error occurred while creating the claim.",
        });
    }
});

router.get("/getClaims", async (req, res) => {
    try {
        const claims = await Insurance.find({});
        return res.status(200).json(claims);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getClaims/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const claims = await Insurance.find({ pemail });
        if (claims.length === 0) {
            return res.status(404).send({ message: "No claims found!" });
        }
        return res.status(200).json(claims);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/updateClaimStatus/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const { status } = req.body;
        if (!status || !["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).send({
                message: "Invalid status value. Allowed values are 'Pending', 'Approved', or 'Rejected'.",
            });
        }
        const result = await Insurance.findOneAndUpdate(
            { pemail },
            { status },
            { runValidators: true, new: true }
        );
        if (!result) {
            return res.status(404).send({ message: "Claim not found!" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/deleteClaim/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const result = await Insurance.findOneAndDelete({ pemail });
        if (!result) {
            return res.status(404).send({ message: "Claim not found!" });
        }
        return res.status(200).json({ message: "Deleted successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;