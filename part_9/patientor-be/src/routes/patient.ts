import express from "express";
import patientService from "../services/patient";
import { toNewEntry, toNewPatient } from "../utils";

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
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
