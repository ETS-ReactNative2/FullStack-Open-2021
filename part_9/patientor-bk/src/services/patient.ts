import patients from "../data/patients.json";
import { NonSensitiveInfo } from "../type";

const getNonSensitiveInfo = (): NonSensitiveInfo[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export default { getNonSensitiveInfo };
