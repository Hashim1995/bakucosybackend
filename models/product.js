const mongoose = require("mongoose");
const productScheme = new mongoose.Schema({
  time: { type: Date, default: Date.now() },
  categoryId: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  barcode: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  discount: {
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
    description: String,
  },
  imgList: {
    type: [String],
    required: true,
  },
  isStock: {
    type: Boolean,
    required: true,
  },
  isNew: {
    type: Boolean,
    required: true,
  },
  isSale: {
    type: Boolean,
    required: true,
  },
  popularity: {
    type: Number,
  },
  stockCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productScheme);
