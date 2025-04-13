import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating, Patient } from '../types';
import patientService from '../services/patients';
import EntryInfo from './EntryInfo';
import { SelectChangeEvent, Select, MenuItem } from '@mui/material';
import React from 'react';

interface Props {
  diagnoses: Diagnosis[]
}

interface ratingOption {
  value: HealthCheckRating;
  label: string;
}

const PatientInfo = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");
  //hospital
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  //occupational
  const [employerName, setEmployerName] = useState('');
  const [sickStartDate, setSickStartDate] = useState('');
  const [sickEndDate, setSickEndDate] = useState('');


  const ratingOptions: ratingOption[] = Object.entries(HealthCheckRating)
    .filter(([key, value]) => isNaN(Number(key))) // Filter out numeric values
    .map(([key, value]) => ({
      value: value as HealthCheckRating,
      label: key
    }));

  console.log("diagnoses", diagnoses);
  console.log("codes", diagnosisCodes);

  const handleHealthCheckChange = (event: SelectChangeEvent<HealthCheckRating>) => {
    setHealthCheckRating(Number(event.target.value));
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log({ description, date, specialist, diagnosisCodes, healthCheckRating });
    const id: string = patient?.id as string;

    let entryData: EntryWithoutId;

    if (entryType === "HealthCheck") {
      entryData = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating
      };
    } else if (entryType === "Hospital") {
      entryData = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      };
    } else if (entryType === "OccupationalHealthcare") {
      entryData = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "OccupationalHealthcare",
        employerName,
        sickLeave: {
          startDate: sickStartDate,
          endDate: sickEndDate
        }
      };
    }


    try {
      const updatedPatient = await patientService.addEntries(
        id,
        entryData);
      setPatient(updatedPatient);
    } catch (error: unknown) {
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
            <Select
              value={entryType}
              onChange={(e) => setEntryType(e.target.value as Entry["type"])}
            >
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>
          </label>
        </div>
        <div>
          <label>description
            <input value={description}
              onChange={({ target }) => setDescription(target.value)} />
          </label>
        </div>
        <div>
          <label>date
            <input type="date" value={date}
              onChange={({ target }) => setDate(target.value)} />
          </label>
        </div>
        <div>
          <label>specialist
            <input value={specialist}
              onChange={({ target }) => setSpecialist(target.value)} />
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
        {/* <div>
          <label>Health check rating
            <Select
              value={healthCheckRating}
              onChange={handleHealthCheckChange}
            >
              {ratingOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </label>
        </div> */}
        {entryType === "HealthCheck" && (
          <div>
            <label>Health check rating</label>
            <Select value={healthCheckRating} onChange={handleHealthCheckChange}>
              {ratingOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

        {entryType === "Hospital" && (
          <div>
            <div>
            <label>Discharge date
              <input type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} />
            </label>
            </div>
            <div>
            <label>Discharge criteria
              <input value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)} />
            </label>
            </div>
          </div>
        )}

        {entryType === "OccupationalHealthcare" && (
          <div>
            <div>
            <label>Employer name
              <input value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
            </label>
            </div>
            <div>
            <label>Sick leave start
              <input type="date" value={sickStartDate} onChange={(e) => setSickStartDate(e.target.value)} />
            </label>
            </div>
            <div>
            <label>Sick leave end
              <input type="date" value={sickEndDate} onChange={(e) => setSickEndDate(e.target.value)} />
            </label>
            </div>
          </div>
        )}


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
