import React from "react";
import { Courses, CoursePart, CourseProps } from "./types";

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Part = ({ course }: CourseProps) => {
  switch (course.type) {
    case "normal":
      return (
        <div>
          <div>
            <strong>
              {course.name} {course.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{course.description}</em>
          </div>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <div>
            <strong>
              {course.name} {course.exerciseCount}
            </strong>
          </div>
          <div>project exercise {course.groupProjectCount}</div>
        </div>
      );
    case "submission":
      return (
        <div>
          <div>
            <strong>
              {course.name} {course.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{course.description}</em>
          </div>
          <div>subit to: {course.exerciseSubmissionLink}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <div>
            <strong>
              {course.name} {course.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{course.description}</em>
          </div>
          <div>required skills: {course.requirements.join(", ")}</div>
        </div>
      );
    default:
      return null;
  }
};

const Content = ({ courses }: Courses) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const parts = courses.map((course) => {
    switch (course.type) {
      case "normal":
        return <Part key={course.name} course={course} />;
      case "groupProject":
        return <Part key={course.name} course={course} />;
      case "submission":
        return <Part key={course.name} course={course} />;
      case "special":
        return <Part key={course.name} course={course} />;
      default:
        return assertNever(course);
    }
  });
  return <React.Fragment>{parts}</React.Fragment>;
};

const Total = ({ courses }: Courses): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce(
        (carry: number, part: CoursePart) => carry + part.exerciseCount,
        0
      )}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
