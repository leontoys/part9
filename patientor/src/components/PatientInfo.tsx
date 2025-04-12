import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, HealthCheckRating, Patient } from '../types';
import patientService from '../services/patients';
import EntryInfo from './EntryInfo';
import { SelectChangeEvent } from '@mui/material';

interface Props {
  diagnoses: Diagnosis[]
}

const PatientInfo = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating|string>("");

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
        type:"HealthCheck",
      });
      setPatient(updatedPatient);
    } catch (error:unknown) {
      console.error(error?.message);
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const values = value.split(",");
      console.log("values",values);
      setDiagnosisCodes(values.map( value => value as unknown as Diagnosis));
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
            <input value={date}
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
          <label>diagnosisCodes
            <input value={diagnosisCodes.join(",")}
                    onChange={onDiagnosisCodesChange}/>
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
