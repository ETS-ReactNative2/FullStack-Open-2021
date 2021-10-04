const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;
  if (password.length < 3)
    return response.status(400).json({
      error:
        "User validation failed: password: Path `password` is shorter than the minimum allowed length (3).",
    });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });
  const savedBlog = await user.save();
  response.json(savedBlog);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

module.exports = userRouter;
