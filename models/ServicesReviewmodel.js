import mongoose from "mongoose";

const servicesReviewSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  pemail: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  ServicesTaken: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
    minlength: 10,
  },
}, { timestamps: true });

export const ServicesReview = mongoose.model("ServicesReview", servicesReviewSchema);