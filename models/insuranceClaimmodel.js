import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  pemail: {
    type: String,
    required: true,
    unique: true,
  },
  insurancecompany: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

export const Insurance = mongoose.model("Insurance", insuranceSchema);
