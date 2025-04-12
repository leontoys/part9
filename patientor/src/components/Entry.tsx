import { Entry, Diagnosis } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';


interface Props {
    entry: Entry,
    diagnoses: Diagnosis[]
}

const EntryInfo = ({ entry, diagnoses }: Props) => {
    switch (entry.type) {
        case 'Hospital':
            return (
                <div>
                    <LocalHospitalIcon />
                    <p>{entry.date} <em>{entry.description}</em></p>
                    <ul>
                        <p>diagnoses</p>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code}:
                                {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
                        ))}
                    </ul>
                    <p>discharged on : {entry.discharge.date}, criteria - {entry.discharge.criteria}</p>
                </div>
            );
        case 'HealthCheck':
            return (
                <div>
                    <HealthAndSafetyIcon />
                    <p>{entry.date} <em>{entry.description}</em></p>
                    <ul>
                    <p>diagnoses</p>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code}:
                                {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
                        ))}
                    </ul>
                    <p>health check rating : {entry.healthCheckRating}</p>
                </div>
            );
        case 'OccupationalHealthcare':
            return (
                <div>
                    <MedicalServicesIcon />
                    <p>{entry.date} <em>{entry.description}</em></p>
                    <ul>
                    <p>diagnoses</p>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code}:
                                {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
                        ))}
                    </ul>
                    <p>employer : {entry.employerName}</p>
                </div>
            );
        default:
            return (<></>);
    }
};

export default EntryInfo;