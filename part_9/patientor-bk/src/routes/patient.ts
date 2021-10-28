import express from "express";
import patientService from "../services/patient";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitiveInfo());
});

router.get("/:id", (req, res) => {
  res.json(patientService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
