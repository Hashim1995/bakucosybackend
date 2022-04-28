const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createToken = (email, expireTime) => {
  const accessToken = sign(
    { email: email },
    process.env.ACCESS_TOKEN_SECRET,
    expireTime
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.headers.access_token;
  if (!accessToken) {
    return res.status(400).send({ message: "You dont have access for that!" });
  } else {
    try {
      const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if (validToken) {
        req.authenticated = true;
        return next();
      } else {
        return res.status(400).send({ message: "Your token is not valid" });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  }
};

module.exports = { createToken, validateToken };
