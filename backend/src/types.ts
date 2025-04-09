import { z } from "zod";
import { NewPatientSchema } from "./utils";

export enum Gender{
    male = 'male',
    female = 'female',
    other = 'other'
}

export interface diagnosesEntry {
    code: string,
    name: string,
    latin?: string
};

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};

export type PatientNoSSN = Omit<Patient, 'ssn'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;