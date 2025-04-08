import express from 'express';
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get('/',(_req,res)=>{
    //res.send('Fetching all');
    res.send(diagnosesService.getEntries());
});

router.post('/',(_req,res)=>{
    res.send('Saving');
});

export default router;