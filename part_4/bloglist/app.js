const config = require("./utils/configs");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const BlogRouter = require("./controllers/blogs");
const UserRouter = require("./controllers/users");
const LoginRouter = require("./controllers/login");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const mongoUrl = config.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) =>
    logger.info(`Error connecting to MongoDB: ${error.message}`)
  );

app.use(cors());
// app.use(express.static('build'))
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", BlogRouter);
app.use("/api/users", UserRouter);
app.use("/api/login", LoginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
