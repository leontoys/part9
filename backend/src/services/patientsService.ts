import patientsData from "../data/patients";
import { Patient, PatientNoSSN } from "../types";


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

const addPatient = () => {
    return null;
};

export default {
    getEntries,
    addPatient
};