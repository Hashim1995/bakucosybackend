const express = require("express");
const router = express.Router();
const Product = require("../../models/product");

// getting all products

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

// getting one product
router.get("/products/:slug", getProductBySlug, (req, res) => {
  res.json(res.product);
});

// creating a new product
router.post("/create", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  const updatedItemReq = {
    title: req.body.title,
    categoryId: req.body.categoryId,
    categories: req.body.categories,
    barcode: req.body.barcode,
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
  };
  try {
    const id = req.params.id;
    const update = req.body;
    const result = await Product.findByIdAndUpdate(id, update);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await Product.remove();
    res.json({ message: "Deleted all products" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//insert multiple items
router.post("/insertmultiple", (req, res) => {
  Product.insertMany(req.body)
    .then((items) => {
      res.status(201).send(items);
    })
    .catch((err) => res.status(404).send({ message: err.message }));
});

// middleware
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product by id" });
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
