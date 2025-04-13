import { NewPatient, Gender, HealthCheckRating } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
    name : z.string(),
    dateOfBirth : z.string().date(),
    ssn : z.string(),
    occupation : z.string(),
    gender : z.nativeEnum(Gender)
});

export const toNewPatient = (object:unknown):NewPatient => {

    return NewPatientSchema.parse(object);
    
};


const BaseEntrySchema = z.object({
    description : z.string(),
    date : z.string().date(),
    specialist : z.string(),
    diagnosisCodes : z.array(z.string())
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type : z.literal("HealthCheck"),
    healthCheckRating : z.nativeEnum(HealthCheckRating)
});

const HosptialEntrySchema = BaseEntrySchema.extend({
    type : z.literal("Hospital"),
    discharge : z.object({
        date : z.string().date(),
        criteria : z.string()
    })
});

const OccupationalEntrySchema = BaseEntrySchema.extend({
    type : z.literal('OccupationalHealthcare'),
    employerName : z.string(),
    sickLeave : z.object({
        startDate : z.string().date(),
        endDate : z.string().date()
    })
});

export const NewEntrySchema = z.discriminatedUnion("type",[
    HealthCheckEntrySchema,
    HosptialEntrySchema,
    OccupationalEntrySchema
]);