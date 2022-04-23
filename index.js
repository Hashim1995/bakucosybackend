//getting express
const express = require("express");

//initialized cors library
const cors = require("cors");

//initialized app from express method
const app = express();

//initialized .env
require("dotenv").config();

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

//getting productlistRouter route file
const productlistRouter = require("./routes/products/productlist");
const users = require("./routes/users/users");
//connect the route to applciation
app.use("/productlist", productlistRouter);
// app.use("/users", users);

//start the server
app.listen(3000, () => console.log("Server is running"));
