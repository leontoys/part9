/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsSerivce from "../services/patientsService";

const router = express.Router();

router.get('/',(_req,res)=>{
    //res.send('fetching all');
    res.send(patientsSerivce.getEntries());
});

router.post('/',(req,res)=>{
    //disabled above type check
    const {name,dateOfBirth,gender,occupation,ssn} = req.body;  

    //call service
    const addedPatient = patientsSerivce.addPatient({
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn
    });
    //return new
    res.json(addedPatient);
});

export default router;