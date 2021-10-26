import express from "express";
import diagnoseRouter from "./routes/diagnose";
import patientRouter from "./routes/patient";

const app = express();

app.use(express.json());
app.use(express.static("build"));

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
