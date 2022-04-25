const express = require("express");
const router = express.Router();
const Product = require("../../models/product");

// getting all products

router.delete("/delete-product", async (req, res) => {
  try {
    await Product.remove();
    res.json({ message: "Deleted all products" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
