import React from "react";
import personService from "../service/persons";

const Persons = ({ personsToShow, persons, setPersons, handleMessage }) => {
  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          handleMessage(false, `Deleted ${person.name}.`);
        })
        .catch(() => {
          handleMessage(
            false,
            `Information of ${person.name} has been already been removed from server.`
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };
  return (
    <>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDeletePerson(person)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
