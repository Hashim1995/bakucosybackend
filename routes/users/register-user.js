const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const Bcrypt = require("bcryptjs");
router.post("/register-user", async (req, res) => {
  try {
    const hashedPassword = (req.body.password = Bcrypt.hashSync(
      req.body.password,
      10
    ));
    const newUser = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      gender: req.body.gender,
    };
    await User.create(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
