import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./service/persons";

const App = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState(null);
  const [persons, setPersons] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    personService.getAll().then((initData) => setPersons(initData));
  }, []);

  const handleMessage = (success, newMessage) => {
    setIsSuccess(success);
    setMessage(newMessage);
    setTimeout(() => setMessage(null), 3000);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filterValue)
  );

  return (
    <div>
      <Notification success={isSuccess} message={message} />
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        handleMessage={handleMessage}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        persons={persons}
        setPersons={setPersons}
        handleMessage={handleMessage}
      />
    </div>
  );
};

export default App;
