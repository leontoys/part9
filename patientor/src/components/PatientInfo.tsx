import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../types';
import patientService from '../services/patients';

interface Props {
  diagnoses : Diagnosis[]
}

const PatientInfo = ({ diagnoses } : Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

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
      <h3>entries</h3>
      {patient.entries?.map(entry => (
        <div key={entry.id}>
          <p>{entry.date} <em>{entry.description}</em></p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>{code}: 
              { diagnoses.find(diagnosis => diagnosis.code === code)?.name }</li>
            ))}
          </ul>
        </div>))}
    </div>
  );
};

export default PatientInfo;
