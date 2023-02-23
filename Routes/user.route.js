const express = require("express");

const { Usermodel } = require("../Models/user.model");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name && email && password) {
      let user = new Usermodel({ name, email, password });
      await user.save();
      res.status(201).send("registered Successfully ");
    } else {
      res.status(401).send("all filed are required");
    }
  } catch (err) {
    res.send(err.message);
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await Usermodel.find({ email: email });
    if (User.length > 0) {
      const passwordMatch = User[0].password === password;
      if (passwordMatch) {
        res.status(201).send("Login successful");
      } else {
        res.status(401).send("wrong password");
      }
    } else {
      res.send("Email not found");
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  UserRouter,
};
