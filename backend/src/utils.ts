import { NewPatient, Gender } from "./types";

const isString = (text:unknown): text is string => { //Type predicate - parameter is Type
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name:unknown) : string => {
    if(!name || !isString(name)){
        throw new Error('Incorrect or Missing name');
    }
    return name; //will change from unknown to string
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const parseOccupation = (occupation:unknown) : string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or Missing Occupation');
    }
    return occupation; //will change from unknown to string
}; 

const parseSSN = (ssn:unknown) : string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or Missing SSN');
    }
    return ssn; //will change from unknown to string
}; 

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
  };  

const toNewPatient = (object:unknown):NewPatient => {
    
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
 
    if ('name' in object && 
        'dateOfBirth' in object && 
        'ssn' in object && 
        'occupation' in object &&
        'gender' in object)  {      
    const newPatient:NewPatient = {
        name : parseName(object.name),
        ssn : parseSSN(object.ssn),
        dateOfBirth : parseDate(object.dateOfBirth),
        gender : parseGender(object.gender),
        occupation : parseOccupation(object.occupation)
    };

    return newPatient;
}

throw new Error('Incorrect data: some fields are missing');

};

export default toNewPatient;