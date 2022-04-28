const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const Bcrypt = require("bcryptjs");

const { createToken } = require("../../JWT");

router.post("/login-user", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(200).json({
        status: "fail",
        userFound: false,
        message: `The user not found`,
      });
    } else {
      if (!Bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(200).json({
          status: "fail",
          userFound: true,
          password: false,
          message: `The password is invalid`,
        });
      } else {
        const accessToken = createToken(user.email, {
          expiresIn: "7d",
        });
        const userData = {
          name: user.name,
          surname: user.surname,
          gender: user.gender,
          phone: user.phone,
          email: user.email,
          id: user._id,
        };

        res.send({
          status: "success",
          userFound: true,
          password: true,
          message: "The username and password combination is correct",
          token: accessToken,
          user: userData,
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
