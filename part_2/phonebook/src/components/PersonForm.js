import React, { useState } from "react";
import personService from "./../service/persons";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const filteredPersons = persons.filter((person) => person.name === newName);
    if (filteredPersons.length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const id = filteredPersons[0].id;
        personService
          .update(id, newPerson)
          .then((updatedData) =>
            setPersons(persons.map((p) => (p.id === id ? updatedData : p)))
          );
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedData) => setPersons(persons.concat(returnedData)));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
