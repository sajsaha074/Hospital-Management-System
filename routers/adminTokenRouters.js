import express from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/adminmodel.js";
import { jwt_secret_key } from "../config.js";

const router = express.Router();

router.post('/adminLogin', async (req, res) => {
  try {
    const { username, adminpassword } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).send({ message: "Invalid username or password" });
    }
    if (admin.adminpassword!==adminpassword) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      jwt_secret_key,
      { expiresIn: '7h' }
    );

    return res.status(200).json({ 
        token,
        username: admin.username });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;