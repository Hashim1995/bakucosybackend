const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://hashim:bakucosy@cluster0.rd1x2.mongodb.net/Cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database "));

app.use(express.json());
const productlistRouter = require("./routes/productlist");

app.use("/productlist", productlistRouter);

app.listen(3000, () => console.log("Server is running"));
