import React, { useEffect } from "react";
import { Diagnosis, Entry } from "../types";
import { Card } from "semantic-ui-react";
import { setDiagnoses, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import EntryCom from "./Entry";

interface Entries {
  entries: Entry[];
}

const Entries = ({ entries }: Entries) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const { data: returnedDiagnoses } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnoses(returnedDiagnoses));
    };
    void fetchDiagnoses();
  }, []);

  const assertNevers = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const entriesData = entries.map((entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <EntryCom entry={entry} />;
      case "HealthCheck":
        return <EntryCom entry={entry} />;
      case "OccupationalHealthcare":
        return <EntryCom entry={entry} />;
      default:
        return assertNevers(entry);
    }
  });

  const entryWithDiagnoseCodes = entries.filter(
    (entry) => entry.diagnosisCodes
  );

  return (
    <React.Fragment>
      <div>
        <br />
        <h3>entries</h3>
        {entriesData}
        {entryWithDiagnoseCodes.length > 0 && (
          <Card fluid>
            <Card.Content>
              <Card.Header>Diagnoses</Card.Header>
              {entryWithDiagnoseCodes
                .flatMap((fiteredEntry) => fiteredEntry.diagnosisCodes)
                .map((code) => {
                  const diagnose = diagnoses.find((d) => d.code === code);
                  return (
                    <Card.Description key={code}>
                      {code} {diagnose ? diagnose.name : ""}
                    </Card.Description>
                  );
                })}
            </Card.Content>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
};

export default Entries;
