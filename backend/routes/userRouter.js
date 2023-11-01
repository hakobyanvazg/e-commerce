const express = require("express");
const userRouter = express.Router();
const { isUser, isAdmin } = require("../middlewares/auth");
const userController = require("../controllers/userController");

// Get user stats
userRouter.get("/users/stats", isAdmin, userController.userStates);
userRouter.get("/users/", isAdmin, userController.getAllUsers);
userRouter.delete("/users/delete/:id", isAdmin, userController.deleteUser);
userRouter.get("/users/find/:id", isUser, userController.getUser);
userRouter.put("/users/update/:id", isUser, userController.updateUser);

module.exports = userRouter;
