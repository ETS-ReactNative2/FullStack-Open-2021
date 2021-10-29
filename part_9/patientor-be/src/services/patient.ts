import patients from "../data/patients";
import { Patient, NewPatient, Entry, EntryWithoutId } from "../type";
import { toNewPatient } from "../utils";
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

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const patient = patients.find((p) => p.id === patientId);
  if (patient) patient?.entries.push(newEntry);
  // patients = patients.map((p) => (p.id === patientId ? patient : p));
  return newEntry;
};

export default { getNonSensitiveInfo, addNewPatient, getPatient, addEntry };
