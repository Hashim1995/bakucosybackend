const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
