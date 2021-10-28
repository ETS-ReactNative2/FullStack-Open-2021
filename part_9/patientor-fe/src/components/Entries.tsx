import React, { useEffect } from "react";
import { Diagnosis, Entry, HealthCheckRating } from "../types";
import { Card, Icon } from "semantic-ui-react";
import { setDiagnoses, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";

interface Entries {
  entries: Entry[];
}

interface EntryIn {
  entry: Entry;
}

interface Rating {
  rating: HealthCheckRating;
}

const Rating = ({ rating }: Rating): JSX.Element | null => {
  switch (rating) {
    case 0:
      return <Icon color="green" name="heart" />;
    case 1:
      return <Icon color="yellow" name="heart" />;
    case 2:
      return <Icon color="orange" name="heart" />;
    case 3:
      return <Icon color="red" name="heart" />;
    default:
      return null;
  }
};

const EntryCom = ({ entry }: EntryIn): JSX.Element | null => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="hospital" />
            </Card.Header>
            <Card.Meta>
              <em>{entry.description}</em>
            </Card.Meta>
          </Card.Content>
        </Card>
      );
    case "HealthCheck":
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="doctor" />
            </Card.Header>
            <Card.Meta>
              <em>{entry.description}</em>
            </Card.Meta>
            <Rating rating={entry.healthCheckRating} />
          </Card.Content>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="stethoscope" />
            </Card.Header>
            <Card.Meta>
              <em>{entry.description}</em>
            </Card.Meta>
          </Card.Content>
        </Card>
      );
    default:
      return null;
  }
};

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
