import express from "express";
import patientsSerivce from "../services/patientsService";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/',(_req,res)=>{
    //res.send('fetching all');
    res.send(patientsSerivce.getEntries());
});

router.post('/',(req,res)=>{
    try {
    //convert body object to valid type
    const newPatient = toNewPatient(req.body);
    //call service
    const addedPatient = patientsSerivce.addPatient(newPatient);
    //return new
    res.json(addedPatient);        
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);        
    }

});

export default router;