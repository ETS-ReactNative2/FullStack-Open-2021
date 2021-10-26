import patients from "../data/patients.json";
import { NonSensitiveInfo, Patient, NewPatient } from "../type";
import { v1 as uuid } from "uuid";

const getNonSensitiveInfo = (): NonSensitiveInfo[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addNewPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitiveInfo, addNewPatient };
