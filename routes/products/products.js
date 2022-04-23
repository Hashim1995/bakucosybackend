const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
router.get("/products", async (req, res) => {
  if (req.query.page && req.query.limit) {
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const products = await Product.find();
    const result = products.slice(startIndex, endIndex);
    res.json(result);
  } else {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
