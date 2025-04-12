import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, HealthCheckRating, Patient } from '../types';
import patientService from '../services/patients';
import EntryInfo from './EntryInfo';
import { SelectChangeEvent, Select, OutlinedInput, MenuItem } from '@mui/material';
import React from 'react';

interface Props {
  diagnoses: Diagnosis[]
}

const PatientInfo = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating|string>("");

  console.log("diagnoses",diagnoses);
  console.log("codes",diagnosisCodes);
  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };  

  const addEntry = async (event:SyntheticEvent) => {
    event.preventDefault();
    console.log({description,date,specialist,diagnosisCodes});
    const id:string = patient?.id as string;
    try {
      const updatedPatient = await patientService.addEntries(
        id,
        {
        description,
        date,
        specialist,
        diagnosisCodes,
        type:"HealthCheck",
      });
      setPatient(updatedPatient);
    } catch (error:unknown) {
      console.error(error?.message);
    }
  };


  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const data = await patientService.findById(id);
          setPatient(data); 
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading patient info...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn : {patient.ssn}</p>
      <p>occupation : {patient.occupation}</p>
      <form onSubmit={addEntry}>
        <div>
          <label>description
            <input value={description}
                    onChange={({target}) => setDescription(target.value)}/>
            </label>
        </div>
        <div>
          <label>date
            <input type="date" value={date}
                    onChange={({target}) => setDate(target.value)}/>
          </label>
        </div>
        <div>
          <label>specialist
            <input value={specialist}
                    onChange={({target}) => setSpecialist(target.value)}/>
          </label>
        </div>
        <div>
          <label>diagnosis codes
          <Select
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
            >
              {diagnosis.code}
            </MenuItem>
          ))}
        </Select>
          </label>
        </div>
        <div>
          <label>healthCheckRating
            <input value={healthCheckRating}
                    onChange={({target}) => setHealthCheckRating(target.value)}/>
          </label>
        </div>        
        <button type='submit'>add</button>
      </form>
      <h3>entries</h3>
      {patient.entries?.map(entry => (
        <EntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientInfo;
