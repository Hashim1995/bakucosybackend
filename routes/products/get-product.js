const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
// getting one product
router.get("/get-product/:slug", getProductBySlug, (req, res) => {
  res.json(res.product);
});

// middleware for slug
async function getProductBySlug(req, res, next) {
  let product;
  try {
    product = await Product.find({ slug: req.params.slug });
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product by slug" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
