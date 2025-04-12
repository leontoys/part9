import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../types';
import patientService from '../services/patients';
import EntryInfo from './Entry';

interface Props {
  diagnoses: Diagnosis[]
}

const PatientInfo = ({ diagnoses }: Props) => {
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
        <EntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientInfo;
