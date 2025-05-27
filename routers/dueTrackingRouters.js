import express from "express";
import { DueTracking } from "../models/duetrackingmodel.js";

const router = express.Router();

// Save due date
router.post("/saveDueDate", async (req, res) => {
  try {
    const { pemail, total_due, deadline } = req.body;

    if (!pemail || total_due === undefined || !deadline) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newDueTracking = new DueTracking({ pemail, total_due, deadline });
    const savedDueTracking = await newDueTracking.save();
    console.log("Due date saved successfully:", savedDueTracking);
    return res.status(201).json(savedDueTracking);
  } catch (error) {
    console.error("Error saving due date:", error.message);
    return res.status(500).json({ message: error.message });
  }
});


// Get all due trackers
router.get("/getDeadline", async (req, res) => {
  try {
      const deadline = await deadline.find({}, "email deadline"); // Fetch only email and deadline fields
      res.status(200).json(deadline);
  } catch (error) {
      console.error("Error fetching due trackers:", error.message);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Restrict patient
router.post("/restrictPatient", async (req, res) => {
  const { email } = req.body;

  if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }

  try {
      const result = await DueTracker.updateOne(
          { email },
          { $set: { pAvailability: false } }
      );

      if (result.modifiedCount > 0) {
          res.status(200).json({ message: "Patient restricted successfully" });
      } else {
          res.status(404).json({ message: "Patient not found" });
      }
  } catch (error) {
      console.error("Error restricting patient:", error.message);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Get total due and email
router.get("/getTotalDue", async (req, res) => {
  try {
      const totalDue = await deadline.aggregate([
          { $group: { _id: null, totalDue: { $sum: "$dueAmount" } } }, // Assumes there's a 'dueAmount' field to sum
          { $project: { _id: 0, totalDue: 1 } }
      ]);
      const emails = await deadline.find({}, "email"); // Fetch only the email field

      res.status(200).json({ totalDue: totalDue[0]?.totalDue || 0, emails });
  } catch (error) {
      console.error("Error fetching total due and emails:", error); // Log the entire error for debugging
      res.status(500).json({ message: "Internal server error", error: error.message }); // Return more error details
  }
});

export default router;