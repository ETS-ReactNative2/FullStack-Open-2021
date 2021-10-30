import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { EntryWithoutId, HealthCheckRating, EntryType } from "../types";
import { Field, Form, Formik } from "formik";
import { useStateValue } from "../state";
import {
  DiagnosisSelection,
  TextField,
  SelectField,
  RatingOption,
  TypeOption,
} from "./FormField";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
];

const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [type, setType] = useState("HealthCheck");

  const handleChangeType = (type: string): void => {
    console.log(type);
    setType(type);
  };

  console.log("type: ", type);
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        healthCheckRating: 2,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        // if (!values.type) {
        //   errors.name = requiredError;
        // }
        handleChangeType(values.type);
        if (!values.date) {
          errors.ssn = requiredError;
        }
        if (!values.description) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.specialist) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              value={type}
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Date"
              placeholder="date"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            {type === "HealthCheck" && (
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={ratingOptions}
              />
            )}
            {type === "Hospital" && (
              <div style={{ marginBottom: "20px" }}>
                <h5 style={{ padding: 0, margin: 0 }}>Discharge</h5>
                <Grid>
                  <Grid.Column floated="left" width={8}>
                    <Field
                      placeholder="Discharge date"
                      name="dischargeDate"
                      component={TextField}
                    />
                  </Grid.Column>
                  <Grid.Column floated="right" width={8}>
                    <Field
                      placeholder="Criteria"
                      name="criteria"
                      component={TextField}
                    ></Field>
                  </Grid.Column>
                </Grid>
              </div>
            )}
            {type === "OccupationalHealthcare" && (
              <div style={{ marginBottom: "20px" }}>
                <Field
                  label="Employer name"
                  placeholder="employer name"
                  name="employerName"
                  component={TextField}
                />
                <h5 style={{ padding: 0, margin: 0 }}>Sick leave</h5>
                <Grid>
                  <Grid.Column floated="left" width={8}>
                    <Field
                      placeholder="Start date"
                      name="startDate"
                      component={TextField}
                    />
                  </Grid.Column>
                  <Grid.Column floated="right" width={8}>
                    <Field
                      placeholder="End date"
                      name="endDate"
                      component={TextField}
                    ></Field>
                  </Grid.Column>
                </Grid>
              </div>
            )}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
