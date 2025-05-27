import express from "express";
import { Insurance } from "../models/insuranceClaimmodel.js";

const router = express.Router();

// Fetch pending insurance claims (only specific fields)
router.get("/getPendingRequests", async (req, res) => {
  try {
    const pendingRequests = await Insurance.find({ status: "Pending" }).select(
      "Name InsuranceCompany status " 
    );
    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Approve an insurance claim
router.post("/approveRequest/:pemail", async (req, res) => {
  const { pemail } = req.params;
  try {
    const claim = await Insurance.findOne({ pemail }).select("Name InsuranceCompany status "); 
    if (!claim) {
      return res.status(404).json({ message: "Claim not found." });
    }
    claim.status = "Approved";
    await claim.save();
    res
      .status(200)
      .json({ message: "Claim approved successfully.", claim });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Reject an insurance claim
router.post("/rejectRequest/:pemail", async (req, res) => {
  const { pemail } = req.params;
  try {
    const claim = await Insurance.findOne({ pemail }).select("Name InsuranceCompany status -_id"); // Include specific fields and exclude _id
    if (!claim) {
      return res.status(404).json({ message: "Claim not found." });
    }
    claim.status = "Rejected";
    await claim.save();
    res
      .status(200)
      .json({ message: "Claim rejected successfully.", claim });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
