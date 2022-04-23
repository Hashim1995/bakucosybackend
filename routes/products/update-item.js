const express = require("express");
const router = express.Router();
const Product = require("../../models/product");

router.patch("/update-item/:id", async (req, res) => {
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

module.exports = router;
