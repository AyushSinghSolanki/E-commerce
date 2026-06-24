import express from "express";

import authUser from "../middleware/auth.js";

import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

// Get Cart
cartRouter.post("/get", authUser, getUserCart);

// Add To Cart
cartRouter.post("/add", authUser, addToCart);

// Update Cart
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
