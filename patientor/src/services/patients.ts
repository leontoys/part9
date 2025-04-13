import axios from "axios";
import { Patient, PatientFormValues, Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntries = async (id:string,object: EntryWithoutId) => {
  console.log("object",object)
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

const findById = async(id:string) => {
  const {data}  = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  console.log("data",data);
  return data;
};

export default {
  getAll, create, findById, addEntries
};

