import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry []>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(
//     `${apiBaseUrl}/patients`,
//     object
//   );

//   return data;
// };

export default {
  getAll
//   create
};

