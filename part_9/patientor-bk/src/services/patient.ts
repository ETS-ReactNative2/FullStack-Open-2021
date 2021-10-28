import patients from "../data/patients";
import { Patient, NewPatient } from "../type";
import toNewPatient from "../utils";
import { v1 as uuid } from "uuid";

const getNonSensitiveInfo = (): Patient[] => patients;

const getPatient = (id: string): Patient => {
  const foundPatient = patients.find((patient) => patient.id === id);
  const patient = toNewPatient(foundPatient) as Patient;
  return patient;
};

const addNewPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitiveInfo, addNewPatient, getPatient };
