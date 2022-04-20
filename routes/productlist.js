const express = require("express");
const product = require("../models/product");
const router = express.Router();
const Product = require("../models/product");

// getting all products
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting one product
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// creating a new product
router.post("/", async (req, res) => {
  const product = new Product({
    categoryId: req.body.categoryId,
    categories: req.body.categories,
    barcode: req.body.barcode,
    title: req.body.title,
    price: req.body.price,
    rate: req.body.rate,
    discount: req.body.discount,
    about: req.body.about,
    imgList: req.body.imgList,
    isStock: req.body.isStock,
    isNew: req.body.isNew,
    isSale: req.body.isSale,
    popularity: req.body.popularity,
    stockCount: req.body.stockCount,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// updating a product
router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.name !== null) {
    res.product.name = req.body.name;
  }
  if (req.body.price !== null) {
    res.product.price = req.body.price;
  }
  if (req.body.description !== null) {
    res.product.description = req.body.description;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting a product
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: "Deleted product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
