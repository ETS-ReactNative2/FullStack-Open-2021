const mongoose = require("mongoose");

const url = `mongodb+srv://nemo:${process.argv[2]}@cluster0.ktqca.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 5) {
  Person.find({}).then((result) => {
    console.log("Phone book:");
    result.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
} else {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  newPerson.save().then(() => {
    console.log(
      `added ${newPerson.name} number ${newPerson.number} to phonebook`
    );
    mongoose.connection.close();
  });
}
