const express = require("express");
const cors = require("cors");
const stripe = require("./routes/stripe");
const connectDB = require("./config/db.js");
const morgan = require("morgan");
const products = require("./products");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");

// configure env
require("dotenv").config();

// database config
// connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api", authRouter, productRouter, userRouter, orderRouter);
app.use("/api/stripe", stripe);

app.get("/api/products", (req, res) => {
  res.send(products);
});

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runing on port ${port}`));
