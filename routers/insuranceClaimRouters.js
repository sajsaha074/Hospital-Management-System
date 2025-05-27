import express from "express";
import { Insurance } from "../models/insuranceClaimmodel.js";

const router = express.Router();

// Add a new claim
router.post("/addClaim", async (req, res) => {
  try {
    const { pname, pemail, insurancecompany } = req.body;

    if (!pname || !pemail || !insurancecompany) {
      return res.status(400).send({
        message: "Patient name, email, and insurance company are required.",
      });
    }

    const newClaim = await Insurance.create({
      pname,
      pemail,
      insurancecompany,
      status: "Pending",
    });

    res.status(201).send(newClaim);
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while creating the claim.",
      error: error.message,
    });
  }
});

// Fetch all pending insurance claims
router.get("/getPendingRequests", async (req, res) => {
  try {
    const claims = await Insurance.find({ status: "Pending" });
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete a claim by email
router.delete("/deleteClaim/:pemail", async (req, res) => {
  try {
    const { pemail } = req.params;

    const result = await Insurance.findOneAndDelete({ pemail });
    if (!result) {
      return res.status(404).send({ message: "Claim not found!" });
    }

    res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
