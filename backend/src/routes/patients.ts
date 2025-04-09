import express from "express";
import patientsSerivce from "../services/patientsService";

const router = express.Router();

router.get('/',(_req,res)=>{
    //res.send('fetching all');
    res.send(patientsSerivce.getEntries());
});

router.post('/',(_req,res)=>{
    res.send('saving');
});

export default router;