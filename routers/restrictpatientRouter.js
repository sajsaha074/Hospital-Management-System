import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define the schema for duetrackers collection
const duetrackerSchema = new mongoose.Schema({
    pemail: String, // Patient email
    total_due: Number, // Total due amount
    deadline: Date, // Due deadline
    createdAt: { type: Date, default: Date.now },
    pAvailability: { type: Boolean, default: true }, // Patient availability field
});

const Duetracker = mongoose.model('Duetracker', duetrackerSchema);

// Route to get all patients with email, total_due, and deadline
router.get('/getDueTrackers', async (req, res) => {
    try {
        const patients = await Duetracker.find({}, 'pemail total_due deadline pAvailability');
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
});

// Restrict patient
router.post('/restrictPatient', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const result = await Duetracker.updateOne(
            { pemail: email },
            { $set: { pAvailability: false } }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Patient restricted successfully' });
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        console.error('Error restricting patient:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
