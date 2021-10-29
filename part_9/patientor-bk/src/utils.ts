import {
  NewPatient,
  Gender,
  TypeEntry,
  EntryWithoutId,
  BaseEntryWithoutId,
  HealthCheckRating,
} from "./type";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  if (!date.includes("-")) return false;
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isEntryType = (type: any): type is TypeEntry => {
  return Object.values(TypeEntry).includes(type);
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating))
    throw new Error("Incorrect or missing rating");
  return rating;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender))
    throw new Error("Incorrect or missing gender: " + gender);
  return gender;
};

const parseEntryType = (type: unknown): TypeEntry => {
  if (!type || !isEntryType(type))
    throw new Error("Incorrect or missing type: " + type);
  return type;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error("Incorrect or missing date");
  return date;
};

const parseText = (text: unknown, name: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${name}`);
  }
  return text;
};

export const toNewPatient = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseText(object.name, "name"),
    gender: parseGender(object.gender),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseText(object.ssn, "ssn"),
    occupation: parseText(object.occupation, "occupation"),
    entries: object.entries,
  };
  return newEntry;
};

export const toNewEntry = (object: any): EntryWithoutId => {
  const newBaseEntry: BaseEntryWithoutId = {
    description: parseText(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseText(object.specialist, "specialist"),
  };
  const type = parseEntryType(object.type);
  // const type = object.type;

  switch (type) {
    case "Hospital":
      const newEntry: EntryWithoutId = {
        ...newBaseEntry,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseText(object.discharge.criteria, "criteria"),
        },
        type,
      };
      return newEntry;
    case "OccupationalHealthcare": {
      const newEntry: EntryWithoutId = {
        ...newBaseEntry,
        employerName: parseText(object.employerName, "employerName"),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        },
        type,
      };
      return newEntry;
    }
    case "HealthCheck": {
      const newEntry: EntryWithoutId = {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        type,
      };
      return newEntry;
    }
    default:
      const defaultEntry: EntryWithoutId = {
        ...newBaseEntry,
        type: "HealthCheck",
        healthCheckRating: 0,
      };
      return defaultEntry;
  }
};
