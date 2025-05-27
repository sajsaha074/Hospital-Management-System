import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';



import doctorRouters from "./routers/doctorRouters.js";
import ambulanceRouters from "./routers/ambulanceRouters.js";
import patientRouters from "./routers/patientRouters.js";
import tokenRouters from './routers/tokenRouters.js';
import doctorTokenRouters from './routers/doctorTokenRouters.js';
import adminRouters from './routers/adminRouters.js';
import adminTokenRouters from './routers/adminTokenRouters.js';
import appointmentRouters from './routers/appointmentRouters.js';
import insuranceRouters from './routers/insuranceClaimRouters.js';
import reviewRouters from './routers/servicesreviewRouters.js';
import bedRouters from "./routers/bedRouters.js";
import labRouters from "./routers/labRouters.js";
import medicineRouters from "./routers/medicineRouters.js";
import servicesRouters from './routers/servicesRouters.js';
import insurancereviewapproveRouters from './routers/insurancereviewapproveRouters.js';  
import dueTrackingRouters from './routers/dueTrackingRouters.js';
//import restrictpatientRouters from './routers/restrictpatientRouter.js';
import forgotPasswordEmailRouters from './routers/forgotPasswordEmailRouter.js';


import cors from "cors";


const app = express();
app.use(cors());


app.use(express.json());
app.use('/', doctorRouters);
app.use('/', ambulanceRouters);
app.use('/', patientRouters);
app.use('/', tokenRouters);
app.use('/', doctorTokenRouters);
app.use('/', adminRouters);
app.use('/', adminTokenRouters);
app.use('/', appointmentRouters);
app.use('/', insuranceRouters);
app.use('/', reviewRouters);
app.use('/', bedRouters);
app.use('/', labRouters);
app.use('/', medicineRouters);
app.use('/', servicesRouters);
app.use("/", insurancereviewapproveRouters);
app.use('/', dueTrackingRouters);

app.use('/', forgotPasswordEmailRouters);



app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to HealoPharm");
});
mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App has connected to the database");
    app.listen(PORT, () => {
        console.log(`App is listening to the port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});