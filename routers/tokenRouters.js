import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Patient } from "../models/patientmodel.js";
import { jwt_secret_key } from "../config.js";

const router = express.Router();

router.post('/patientLogin', async (req, res) => {
  try {
    const { pemail, ppassword } = req.body;

    const patient = await Patient.findOne({ pemail });
    if (!patient) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    if (patient.ppassword!==ppassword) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    if (!patient.pAvailability) {
      return res.status(400).send({ message: "Your account is not available. Contact with the administrators." });
    }

    const token = jwt.sign(
      { id: patient._id, email: patient.pemail },
      jwt_secret_key,
      { expiresIn: '7h' }
    );

    return res.status(200).json({ 
        token,
        name: patient.pname,
        email: patient.pemail,
        address: patient.paddress,
        contact: patient.phone,
        dueAmount: patient.dueAmount });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;