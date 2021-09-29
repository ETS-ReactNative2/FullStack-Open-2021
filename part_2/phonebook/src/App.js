import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./service/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    personService.getAll().then((initData) => setPersons(initData));
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filterValue)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
