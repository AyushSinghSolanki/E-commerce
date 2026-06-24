import express from "express";

import authUser from "../middleware/auth.js";

import adminAuth from "../middleware/adminAuth.js";

import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
  verifyRazorpay
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// ================= USER ROUTES =================

// Cash On Delivery
orderRouter.post("/place", authUser, placeOrder);

// Stripe
orderRouter.post("/stripe", authUser, placeOrderStripe);

// Razorpay
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// User Orders
orderRouter.post("/userorders", authUser, userOrders);

// ================= ADMIN ROUTES =================

// All Orders
orderRouter.post("/list", adminAuth, allOrders);

// Update Status
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.post("/verify-razorpay", authUser, verifyRazorpay);

export default orderRouter;
