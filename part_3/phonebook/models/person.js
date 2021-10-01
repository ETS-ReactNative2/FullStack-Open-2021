require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB.`))
  .catch((error) => console.log(`Error connecting to MongoDB: ${error}`));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
