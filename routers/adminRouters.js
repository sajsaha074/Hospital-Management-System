import express from "express";
const router = express.Router();
import {Admin} from "../models/adminmodel.js";

router.post('/addAdmin', async (req, res) => {
    try {
        if(!req.body.name || !req.body.password ) {
            return res.status(400).send({
                message: "Please fillup the information form properly",
            });
        }
        const newAdmin = {
            name: req.body.name,
            password: req.body.password,
            
        };
        const admin = await Admin.create(newAdmin);
        console.log("Admin added successfully");
        return res.status(201).send(admin);
    } catch (error) {
        return res.status(400).send({
            messsage: error.message
        });
    }
});


export default router;