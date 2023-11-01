const express = require("express");
const productController = require("../controllers/productController");
const { isAdmin } = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.post("/products", isAdmin, productController.createProduct);
productRouter.get("/products", productController.getAllProduct);
productRouter.get("/products/find/:id", productController.getProduct);
productRouter.delete("/products/delete/:id",isAdmin, productController.deleteProduct);
productRouter.put("/products/update/:id",isAdmin, productController.updateProduct);


module.exports = productRouter;
