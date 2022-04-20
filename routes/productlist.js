const express = require("express");
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
router.get("/:slug", getProductBySlug, (req, res) => {
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
  if (req.body.categoryId !== null) {
    res.product.categoryId = req.body.categoryId;
  }
  if (req.body.categories !== null) {
    res.product.categories = req.body.categories;
  }
  if (req.body.categories !== null) {
    res.product.categories = req.body.categories;
  }
  if (req.body.barcode !== null) {
    res.product.barcode = req.body.barcode;
  }
  if (req.body.title !== null) {
    res.product.title = req.body.title;
  }
  if (req.body.price !== null) {
    res.product.price = req.body.price;
  }

  if (req.body.rate !== null) {
    res.product.rate = req.body.rate;
  }
  if (req.body.discount !== null) {
    res.product.discount = req.body.discount;
  }
  if (req.body.about !== null) {
    res.product.about = req.body.about;
  }
  if (req.body.imgList !== null) {
    res.product.imgList = req.body.imgList;
  }
  if (req.body.isStock !== null) {
    res.product.isStock = req.body.isStock;
  }
  if (req.body.isNew !== null) {
    res.product.isNew = req.body.isNew;
  }
  if (req.body.isSale !== null) {
    res.product.isSale = req.body.isSale;
  }
  if (req.body.popularity !== null) {
    res.product.popularity = req.body.popularity;
  }
  if (req.body.stockCount !== null) {
    res.product.stockCount = req.body.stockCount;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting all product
router.delete("/deleteall", async (req, res) => {
  try {
    await Product.remove();
    res.json({ message: "Deleted all products" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//insert multiple items
router.post("/items", (req, res) => {
  Product.insertMany(req.body)
    .then((items) => {
      res.status(201).send(items);
    })
    .catch((err) => res.status(404).send(err));
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
