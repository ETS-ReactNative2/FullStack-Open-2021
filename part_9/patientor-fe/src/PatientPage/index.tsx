import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";

const PatientPage = () => {
  const [{ currentPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));
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
          </div>
        )}
      </Container>
    </div>
  );
};

export default PatientPage;
