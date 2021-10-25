interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calulateExcercise = (
  exerciseHours: Array<number>,
  target: number
): Result => {
  const average = exerciseHours.reduce((avg: number, hour: number): number => {
    return (avg += hour / exerciseHours.length);
  }, 0);

  let rating;
  let ratingDescription;
  if (average < target) {
    rating = 1;
    ratingDescription = "You should try harder.";
  } else if (average > target + 2) {
    rating = 2;
    ratingDescription = "Well done, you could do better.";
  } else {
    rating = 3;
    ratingDescription = "Wow, you work so hard, keep going!";
  }
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((exerciseHour) => exerciseHour > 0)
      .length,
    success: average > target,
    rating: rating,
    ratingDescription,
    target,
    average,
  };
};

const target = Number(process.argv[2]);
const exerciseHours: Array<number> = process.argv
  .splice(3)
  .map((arg) => Number(arg));

console.log(exerciseHours);

console.log(calulateExcercise(exerciseHours, target));
