import express from "express";
import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctormodel.js";
import { jwt_secret_key } from "../config.js";

const router = express.Router();

router.post('/doctorLogin', async (req, res) => {
  try {
    const { demail, dpassword } = req.body;

    const doctor = await Doctor.findOne({ demail });
    if (!doctor) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    if (doctor.dpassword!==dpassword) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: doctor._id, email: doctor.demail },
      jwt_secret_key,
      { expiresIn: '7h' }
    );

    return res.status(200).json({ 
        token,
        name: doctor.dname,
        email: doctor.demail,
        specialization: doctor.specialization,
        capacity: doctor.dcapacity,
        availableSlots: doctor.availableSlots });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;