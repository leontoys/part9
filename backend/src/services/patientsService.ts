import patientsData from "../data/patients";
import { Patient, PatientNoSSN, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';

const patients:Patient[] = patientsData;

const getEntries = (): PatientNoSSN[] => {
    //to mask ssn
    return patients.map(({id,name,dateOfBirth,gender,occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient : NewPatient):Patient => { 
        
    //arguments contain everything except id
   const newPaitent = {
    id : uuid(),
    ...patient
   };

   patients.push(newPaitent);

    return newPaitent;
};

export default {
    getEntries,
    addPatient
};