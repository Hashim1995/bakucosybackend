const mongoose = require("mongoose");
const productScheme = new mongoose.Schema({
  barcode: {
    type: Number,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  rate: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  imgList: {
    type: Array,
  },
  isStock: {
    type: Boolean,
  },
  isNew: {
    type: Boolean,
  },
  isSale: {
    type: Boolean,
  },
  popularity: {
    type: Number,
  },
  stockCount: {
    type: Number,
  },
  about: {
    colors: [String],
    sizes: [String],
    weight: String,
    dimension: String,
    origin: String,
    materials: [String],
    tags: [String],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productScheme);
