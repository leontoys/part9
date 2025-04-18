import patientsData from "../data/patients-full";
import { Patient, PatientNoSSN, NewPatient, Entry, EntryWithoutId } from "../types";
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

const findById = (id:string):Patient | undefined => {
    const patient = patients.find( patient => patient.id === id);
    return patient;
};

const addPatient = ( patient : NewPatient):Patient => { 
        
    //arguments contain everything except id
   const newPatient = {
    id : uuid(),
    entries:[],
    ...patient,
   };

   patients.push(newPatient);

    return newPatient;
};

const addEntry = ( entry : EntryWithoutId, entries:Entry[] ):Entry => {
    const newEntry = {
        id : uuid(),
        ...entry,
       }; 
    entries.push(newEntry);      
    return newEntry;
};

export default {
    getEntries,
    addPatient,
    findById,
    addEntry
};