const express = require("express");
const orderRouter = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const orderController = require("../controllers/orderController");

orderRouter.get("/orders/stats", isAdmin, orderController.orderStates);
orderRouter.get("/income/stats", isAdmin, orderController.incomeStates);
orderRouter.get("/orders", isAdmin, orderController.getAllOrders);
orderRouter.get("/orders/findOne/:id", auth, orderController.getOneOrder);
orderRouter.put("/orders/update/:id", isAdmin, orderController.EditOrder);

module.exports = orderRouter;
