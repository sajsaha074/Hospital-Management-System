import express from "express";
const router = express.Router();
import { Patient } from "../models/patientmodel.js"; 


router.post('/addPatient', async (req, res) => {
    try {
        if (!req.body.pname || !req.body.pemail || !req.body.ppassword ||  !req.body.page || !req.body.paddress || !req.body.phone) {
            return res.status(400).send({
                message: "Please fill up the information form properly",
            });
        }

        const newPatient = {
            pname: req.body.pname,
            pemail: req.body.pemail,
            ppassword: req.body.ppassword,
            page: req.body.page, 
            paddress: req.body.paddress, 
            phone: req.body.phone,
            insuranceStatus: false,
            dueAmount: 0,
            pAvailability: true, 
        };

        const patient = await Patient.create(newPatient);
        return res.status(201).send(patient);
    } catch (error) {
        if (error.code === 11000 || error.name === "ValidationError") {
            return res.status(400).send({
                message: "Your email is not valid or already exists.",
            });
        }
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getPatients", async (req, res) => {
    try {
        const patients = await Patient.find({}); 
        return res.status(200).json(patients); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getPatients/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const patient = await Patient.findOne({ pemail });
        if (!patient) {
            return res.status(404).send({ message: "Patient not found!" }); 
        }
        return res.status(200).json(patient);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/updatePatInfo/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const updateData = req.body;
        const result = await Patient.findOneAndUpdate({ pemail }, updateData, { runValidators: true });
        if (!result) {
            return res.status(404).send({ message: "Patient not found!" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/deletePat/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const result = await Patient.findOneAndDelete({ pemail });
        if (!result) {
            return res.status(404).send({ message: "Patient not found!" });
        }
        return res.status(200).json({ message: "Deleted successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/getUnavailablePatients", async (req, res) => {
    try {
        const patients = await Patient.find({ pAvailability: false }); 
        return res.status(200).json(patients); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/makeAvailable/:pemail", async (req, res) => {
    try {
        const { pemail } = req.params;
        const updatedPatient = await Patient.findOneAndUpdate(
            { pemail },
            { pAvailability: true },
            { new: true } // Return the updated document
        );
        if (!updatedPatient) {
            return res.status(404).send({ message: "Patient not found!" });
        }
        return res.status(200).json(updatedPatient);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


router.get('/getPatientData/:pemail', async (req, res) => {
    try {
        const { pemail } = req.params;
        if (!pemail) {
            return res.status(400).json({ message: "Patient email is required" });
        }
        const services = await Service.find({ pemail }).exec();
        if (services.length === 0) {
            return res.status(404).json({ message: "No services found for this patient" });
        }
        return res.status(200).json(services);
    } catch (error) {
        console.error("Error fetching patient data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Route to update due amount
router.post('/updateDueAmount', async (req, res) => {
    try {
        const { pemail, dueAmount } = req.body;
        if (!pemail || dueAmount === undefined) {
            return res.status(400).json({ message: "Patient email and due amount are required" });
        }
        const patient = await Patient.findOneAndUpdate({ pemail }, { dueAmount }, { new: true }).exec();
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json({ message: "Due amount updated successfully", patient });
    } catch (error) {
        console.error("Error updating due amount:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/resetPassword', async (req, res) => {
    const { newPassword, token } = req.body;
  
    try {
      const [email] = token.split('-');
  
      const patient = await Patient.findOne({ pemail: email });
      if (!patient) {
        return res.status(404).json({ message: "Invalid token or patient not found!" });
      }
  
      patient.ppassword = newPassword;
      await patient.save();
  
      res.json({ message: "Password updated successfully!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error resetting password." });
    }
  });
  
export default router;