const express = require("express");
var cors = require("cors");

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
app.use(cors());
const productlistRouter = require("./routes/productlist");
const test = require("./routes/test");

app.use("/productlist", productlistRouter);
app.use("/test", test);

app.listen(3000, () => console.log("Server is running"));
