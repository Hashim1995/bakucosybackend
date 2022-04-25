const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
  const accessToken = sign(user.email, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).send({ message: "You dont have access for that!" });
  } else {
    try {
      const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  }
};

module.exports = { createToken, validateToken };
