import diagnoses from "../data/diagnoses.json";
import { Diagnose } from "../type";

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default { getDiagnoses };
