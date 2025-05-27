import express from 'express';
import nodemailer from 'nodemailer';
import { Patient } from '../models/patientmodel.js';

const router = express.Router();

router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body;

  try {
    const patient = await Patient.findOne({ pemail: email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    const resetToken = `${email}-${Date.now()}`;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'healopharm@gmail.com',
        pass: 'wmnp okty edbs ztql',
      },
    });

    const resetLink = `http://localhost:5173/patient/resetPassword/`;
    const mailOptions = {
      from: 'healopharm@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="text-decoration: none; color: #1a73e8;">Reset password</a>
        <p>Your reset token: ${resetToken}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error sending password reset email." });
  }
});

export default router;