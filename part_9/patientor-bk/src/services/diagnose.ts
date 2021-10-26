import diagnose from "../data/diagnoses.json";
import { Diagnose } from "../type";

const getDiagnoses = (): Array<Diagnose> => {
  return diagnose;
};

export default { getDiagnoses };
