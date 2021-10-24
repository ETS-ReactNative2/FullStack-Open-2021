import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight) && height > 0 && weight >= 0)
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  else
    res.json({
      error: "malformatted parameters",
    });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
