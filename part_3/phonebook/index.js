const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const foundPerson = persons.find((person) => person.id === id);
  if (foundPerson) response.json(foundPerson);
  else response.status(404).end();
});

app.delete("/api/persons/:id", (resquest, response) => {
  const id = Number(resquest.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const personName = request.body.name;
  const number = request.body.number;
  if (!personName)
    return response.status(400).json({ error: "Person name is missing." });
  if (!number)
    return response.status(400).json({ error: "Number is missing." });

  const filterdPersonName = persons.filter(
    (person) => person.name === personName
  );
  if (filterdPersonName.length > 0)
    return response.status(400).json({ error: "Person name must be unique`." });

  const newPerson = {
    name: personName,
    number: number,
    id: Math.floor(Math.random() * 9999999),
  };

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  let date = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  response.write(`<p>Phonebook has info for ${persons.length} people.</p>`);
  response.write(date.toLocaleTimeString("en-us", options));
  response.send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
