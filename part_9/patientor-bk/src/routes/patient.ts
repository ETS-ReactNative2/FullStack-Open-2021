import express from "express";
import patientService from "../services/patient";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitiveInfo());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientService.addNewPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatient);
});

export default router;
