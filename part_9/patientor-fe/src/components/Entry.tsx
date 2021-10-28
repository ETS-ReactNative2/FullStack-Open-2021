import React from "react";
import { Entry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import Rating from "./Rating";

interface EntryIn {
  entry: Entry;
}

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

export default EntryCom;
