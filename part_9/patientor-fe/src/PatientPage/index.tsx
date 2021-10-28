import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Container, Icon } from "semantic-ui-react";

import { Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { setDiagnoses, setPatient, useStateValue } from "../state";

const PatientPage = () => {
  const [{ currentPatient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));

        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnoses));
      } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(error) && error.response) {
          errorMessage += "Error" + String(error.response.data.message);
        }
        console.error(errorMessage);
      }
    };
    if (!currentPatient || currentPatient?.id !== id) void fetchPatient();
  }, [id]);

  console.log(currentPatient);

  return (
    <div className="App">
      <Container textAlign="left">
        {currentPatient && (
          <div>
            <h2>
              {currentPatient.name}
              <span>
                {currentPatient.gender === "male" ? (
                  <Icon name="mars" />
                ) : (
                  <Icon name="venus" />
                )}
              </span>
            </h2>
            <div>ssn: {currentPatient.ssn}</div>
            <div>occupation: {currentPatient.occupation}</div>
            {currentPatient.entries.length > 0 && (
              <>
                <h5>Entries</h5>
                {currentPatient.entries.map((entry) => (
                  <p key={entry.id}>
                    {entry.date} {entry.description}
                  </p>
                ))}
                <ul>
                  {currentPatient.entries
                    .filter((entry) => entry.diagnosisCodes)
                    .flatMap((entry) => entry.diagnosisCodes)
                    .map((code) => {
                      const diagnose = diagnoses.find((d) => d.code === code);
                      return (
                        <li key={code}>
                          {code}: {diagnose ? diagnose.name : ""}
                        </li>
                      );
                    })}
                </ul>
              </>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default PatientPage;
