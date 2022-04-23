const express = require("express");
const router = express.Router();
const Product = require("../../models/product");

//insert multiple items
router.post("/create-products", (req, res) => {
  Product.insertMany(req.body)
    .then((items) => {
      res.status(201).send(items);
    })
    .catch((err) => res.status(404).send({ message: err.message }));
});

module.exports = router;
