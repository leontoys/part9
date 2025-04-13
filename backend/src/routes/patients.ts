import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientsService';
import { NewPatientSchema, NewEntrySchema } from '../utils';

import { z } from 'zod';
import { NewPatient, PatientNoSSN, Patient, EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNoSSN[]>) => {
  res.send(patientService.getEntries());
});

router.get('/:id',(req,res) => {
  const patient = patientService.findById(req.params.id);
  if(patient){
    res.send(patient);
  }
  else{
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    console.error(error);
    next(error);
  }
};

router.post('/:id/entries', newEntryParser, (req: Request<{id:string}, unknown, EntryWithoutId>, res: Response<Patient>) => {  
  console.log('---adding entries---');
  const patient = patientService.findById(req.params.id);
  if(patient){
    const newEntry = patientService.addEntry(req.body,patient.entries || []);
    console.log("new Entry",newEntry);
    res.send(patient);
  }
  else{
    res.sendStatus(404);
  }
});

router.use(errorMiddleware);

export default router;