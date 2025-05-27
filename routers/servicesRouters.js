import express from "express";
const router = express.Router();
import { Service } from "../models/servicesmodel.js"; // Ensure the path is correct
import { Patient } from "../models/patientmodel.js"; // Assuming you have a Patient model

// POST route to add ambulance details to services
router.post('/addServiceAmbulance', async (req, res) => {
    try {
        const { f_id, service_type, item_name, quantity, price, pemail } = req.body;

        if (!f_id || !service_type || !item_name || !quantity || !price || !pemail) {
            return res.status(400).send({ message: "Please fill up the form properly!" });
        }

        const total_price = price * quantity;

        const newServiceItem = {
            f_id,
            service_type,
            item_name,
            quantity,
            total_price,
            pemail,
            date: new Date().toISOString().split('T')[0],
        };

        const service = await Service.create(newServiceItem);

        // Update the patient's due amount
        await updateDueAmount(pemail, total_price);

        console.log("Service item added successfully");
        return res.status(201).send(service);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

// Route to fetch service items by patient email
router.get('/getServiceAmbulance/:pemail', async (req, res) => {
    try {
        const { pemail } = req.params;
        const serviceItems = await Service.find({ pemail, service_type: 'Ambulance' });

        if (serviceItems.length === 0) {
            return res.status(404).send({ message: "No service items found for this email" });
        }

        return res.status(200).json(serviceItems);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// POST route to add medicine details to services
router.post('/addServiceMedicine', async (req, res) => {
    try {
        const { f_id, service_type, item_name, quantity, price, pemail } = req.body;

        if (!f_id || !service_type || !item_name || !quantity || !price || !pemail) {
            return res.status(400).send({ message: "Please fill up the form properly!" });
        }

        const total_price = price * quantity;

        const newServiceItem = {
            f_id,
            service_type,
            item_name,
            quantity,
            total_price,
            pemail,
            date: new Date().toISOString().split('T')[0],
        };

        const service = await Service.create(newServiceItem);

        // Update the patient's due amount
        await updateDueAmount(pemail, total_price);

        console.log("Service item added successfully");
        return res.status(201).send(service);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

// Route to fetch service items for medicines by patient email
router.get('/getServiceMedicine/:pemail', async (req, res) => {
    try {
        const { pemail } = req.params;
        const serviceItems = await Service.find({ pemail, service_type: 'Medicine' });

        if (serviceItems.length === 0) {
            return res.status(404).send({ message: "No service items found for this email" });
        }

        return res.status(200).json(serviceItems);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to fetch all services for a patient
router.get('/getServices', async (req, res) => {
    try {
        const { pemail } = req.query;
        const services = await Service.find({ pemail });
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send({ message: "Error fetching services", error: error.message });
    }
});

// POST route to add lab service details
router.post('/addServiceLab', async (req, res) => {
    try {
        if (!req.body.f_id || !req.body.service_type || !req.body.item_name || !req.body.quantity || !req.body.total_price || !req.body.pemail || !req.body.date) {
            return res.status(400).send({
                message: "Please fill up the form properly!",
            });
        }

        const newLabService = {
            f_id: req.body.f_id,
            service_type: req.body.service_type,
            item_name: req.body.item_name,
            quantity: req.body.quantity,
            total_price: req.body.total_price,
            pemail: req.body.pemail,
            date: req.body.date
        };

        const labService = await Service.create(newLabService);

        // Update the patient's due amount
        await updateDueAmount(req.body.pemail, req.body.total_price);

        return res.status(201).send(labService);
    } catch (error) {
        if (error.code === 11000 || error.name === "ValidationError") {
            return res.status(400).send({
                message: "Something went wrong!.",
            });
        }
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// POST route to add bed service details
router.post('/addServiceBed', async (req, res) => {
    try {
        if (!req.body.f_id || !req.body.service_type || !req.body.item_name || !req.body.quantity || !req.body.total_price || !req.body.pemail || !req.body.date) {
            return res.status(400).send({
                message: "Please fill up the information form properly",
            });
        }

        const newBedService = {
            f_id: req.body.f_id,
            service_type: req.body.service_type,
            item_name: req.body.item_name,
            quantity: req.body.quantity,
            total_price: req.body.total_price,
            pemail: req.body.pemail,
            date: req.body.date
        };

        const bedService = await Service.create(newBedService);

        // Update the patient's due amount
        await updateDueAmount(req.body.pemail, req.body.total_price);

        return res.status(201).send(bedService);
    } catch (error) {
        if (error.code === 11000 || error.name === "ValidationError") {
            return res.status(400).send({
                message: "Something went wrong!.",
            });
        }
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// POST route to add doctor test service details
router.post('/addDoctorTest', async (req, res) => {
    try {
        const { f_id, service_type, item_name, quantity, total_price, pemail, date } = req.body;

        if (!f_id || !service_type || !item_name || !quantity || !total_price || !pemail || !date) {
            return res.status(400).send({
                message: "Please fill up the form properly",
            });
        }

        const newService = {
            f_id,
            service_type,
            item_name,
            quantity,
            total_price,
            pemail,
            date,
        };

        const service = await Service.create(newService);

        // Update the patient's due amount
        await updateDueAmount(pemail, total_price);

        return res.status(201).send(service);
    } catch (error) {
        if (error.code === 11000 || error.name === "ValidationError") {
            return res.status(400).send({
                message: "Something went wrong!",
            });
        }
        console.error("Error adding doctor test:", error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get the first service date based on patient email
router.get('/getFirstServiceDate/:pemail', async (req, res) => {
    try {
        const { pemail } = req.params;
        if (!pemail) {
            return res.status(400).json({ message: "Patient email is required" });
        }

        const firstService = await Service.findOne({ pemail }).sort({ date: 1 }).exec();
        if (!firstService) {
            return res.status(404).json({ message: "No services found for this patient" });
        }

        return res.status(200).json({ firstServiceDate: firstService.date });
    } catch (error) {
        console.error("Error fetching first service date:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// POST route to update the due amount for a patient
router.post('/updateDueAmount', async (req, res) => {
    try {
        const { pemail, dueAmount } = req.body;
        if (!pemail || dueAmount === undefined) {
            return res.status(400).json({ message: "Patient email and due amount are required" });
        }

        // Ensure that the dueAmount is a valid number
        if (isNaN(dueAmount) || dueAmount < 0) {
            return res.status(400).json({ message: "Invalid due amount" });
        }

        // Update the patient's due amount in the database
        const patient = await Patient.findOneAndUpdate(
            { pemail },
            { $inc: { dueAmount } }, // Increment the dueAmount by the new value
            { new: true }  // Return the updated document
        ).exec();

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        return res.status(200).json({
            message: "Due amount updated successfully",
            patient,
        });
    } catch (error) {
        console.error("Error updating due amount:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/getDueAmount/:pemail', async (req, res) => {
    try {
        const { pemail } = req.params;
        if (!pemail) {
            return res.status(400).json({ message: "Patient email is required" });
        }

        // Find the patient by email and select only the dueAmount field
        const patient = await Patient.findOne({ pemail }).select('dueAmount').exec();
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Return the dueAmount of the patient
        return res.status(200).json({ dueAmount: patient.dueAmount });
    } catch (error) {
        console.error("Error fetching due amount:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Helper function to update due amount
async function updateDueAmount(pemail, servicePrice) {
    const patient = await Patient.findOne({ pemail });
    if (!patient) {
        throw new Error("Patient not found");
    }

    // Increment the due amount based on the service price
    await Patient.findOneAndUpdate(
        { pemail },
        { $inc: { dueAmount: servicePrice } },
        { new: true }
    );
}

export default router;
