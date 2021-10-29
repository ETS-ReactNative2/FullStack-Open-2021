import diagnoses from "../data/diagnoses.json";
import { Diagnosis } from "../type";

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default { getDiagnoses };
