import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calulateExcercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
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

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises ?? !target) {
    return res.json({ error: "parameters missing" });
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((hour: number) => isNaN(Number(hour)))
  ) {
    return res.json({
      error: "malformatted parameters",
    });
  }
  return res.json(calulateExcercise(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
