const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
const { validateToken } = require("../../JWT");
// getting all products

router.delete("/delete-products", validateToken, async (req, res) => {
  try {
    await Product.remove();
    res.json({ message: "Deleted all productsz" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
