//getting express
const express = require("express");

//initialized cors library
const cors = require("cors");

//initialized app from express method
const app = express();

//initialized .env
require("dotenv").config();

//initialized cookie-parser
const cookieParser = require("cookie-parser");

//initialized mongoose
const mongoose = require("mongoose");

//initialized mongoDB database connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;

//conenct to database
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database "));

//middleware for parces incoming data to json
app.use(express.json());

//call the cors method
app.use(cors());

//call the cookie-parser method
app.use(cookieParser());

//getting  routes file
const createProduct = require("./routes/products/create-product");
const createProducts = require("./routes/products/create-products");
const deleteProduct = require("./routes/products/delete-product");
const deleteProducts = require("./routes/products/delete-products");
const getProduct = require("./routes/products/get-product");
const getProducts = require("./routes/products/get-products");
const updateProduct = require("./routes/products/update-product");
const registerUser = require("./routes/users/register-user");
const loginUser = require("./routes/users/login-user");

//connect the route to applciation
app.use("/", createProduct);
app.use("/", createProducts);
app.use("/", deleteProduct);
app.use("/", deleteProducts);
app.use("/", getProduct);
app.use("/", getProducts);
app.use("/", updateProduct);
app.use("/", registerUser);
app.use("/", loginUser);

//start the server
app.listen(3000, () => console.log("Server is running"));
