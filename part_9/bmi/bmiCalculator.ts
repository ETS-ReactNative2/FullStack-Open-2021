export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height * height) / 10000);
  if (height <= 0) throw new Error("Height must be larger than 0");
  if (weight < 0) throw new Error("Weight must be equal or larger than 0");
  if (bmi < 16) return "Underweight (Severe thinness)";
  if (bmi >= 16 && bmi <= 16.9) return "Underweight (Moderate thinness)";
  if (bmi >= 17 && bmi <= 18.4) return "Underweight (Mild thinness)";
  if (bmi >= 18.5 && bmi <= 24.9) return "Normal range";
  if (bmi >= 25 && bmi <= 29.9) return "Overweight (Pre-obese)";
  if (bmi >= 30 && bmi <= 34.9) return "Obese (Class I)";
  if (bmi >= 35 && bmi <= 39.9) return "Obese (Class I@)";
  if (bmi >= 40) return "Obese (Class III)";
  return "No result";
};

const heigth: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(heigth, weight));
