import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Container, Icon, Button } from "semantic-ui-react";
import Entries from "../components/Entries";
import axios from "axios";

import { Entry, EntryWithoutId, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addEntry, setPatient, useStateValue } from "../state";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const [{ currentPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (values.type === "HealthCheck") {
        const formattedValues = {
          ...values,
          healthCheckRating: Number(values.healthCheckRating),
        };
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          formattedValues
        );
        dispatch(addEntry(id, newEntry));
      } else {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(addEntry(id, newEntry));
      }
      closeModal();
    } catch (error: any) {
      console.error(error.response?.data || "Unknown Error");
      setError(error.response?.data?.message || "Unknown error");
    }
  };

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
            {currentPatient.entries && (
              <Entries entries={currentPatient.entries} />
            )}
          </div>
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button style={{ marginTop: "20px" }} onClick={() => openModal()}>
          Add New Entry
        </Button>
      </Container>
    </div>
  );
};

export default PatientPage;
