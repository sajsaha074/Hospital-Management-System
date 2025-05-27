import express from "express";
import { ServicesReview } from "../models/ServicesReviewmodel.js";

const router = express.Router();

// Add a new service review
router.post("/addReview", async (req, res) => {
  try {
    const { pname, pemail, ServicesTaken, review } = req.body;

    if (!pname || !pemail || !ServicesTaken || !review) {
      return res.status(400).send({
        message: "Please provide all the required information."
      });
    }

    const newReview = { pname, pemail, ServicesTaken, review };
    const savedReview = await ServicesReview.create(newReview);

    return res.status(201).json({
      message: "Review added successfully!",
      savedReview,
    });
  } catch (error) {
    console.error(error.message); // Log error message
    res.status(500).send({ message: "Error while adding review" });
  }
});

// Get all service reviews
router.get("/getReviews", async (req, res) => {
  try {
    const reviews = await ServicesReview.find({});
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error.message); // Log error message
    res.status(500).send({ message: "Error while fetching reviews" });
  }
});

// Get service reviews by patient email
router.get("/getReviews/:pemail", async (req, res) => {
  try {
    const { pemail } = req.params;
    const reviews = await ServicesReview.find({ pemail });

    if (reviews.length === 0) {
      return res.status(404).send({ message: "No reviews found for this email." });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error.message); // Log error message
    res.status(500).send({ message: "Error while fetching reviews by email" });
  }
});

// Update a service review
router.put("/updateReview/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const updatedReview = await ServicesReview.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).send({ message: "Review not found!" });
    }

    return res.status(200).json({
      message: "Review updated successfully!",
      updatedReview,
    });
  } catch (error) {
    console.error(error.message); // Log error message
    res.status(500).send({ message: "Error while updating review" });
  }
});

// Delete a service review
router.delete("/deleteReview/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedReview = await ServicesReview.findByIdAndDelete(_id);

    if (!deletedReview) {
      return res.status(404).send({ message: "Review not found!" });
    }

    return res.status(200).json({ message: "Review deleted successfully!" });
  } catch (error) {
    console.error(error.message); // Log error message
    res.status(500).send({ message: "Error while deleting review" });
  }
});

export default router;
