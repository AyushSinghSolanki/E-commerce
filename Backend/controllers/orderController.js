import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe"
import razorpay from "razorpay";

const currency = "INR";
const deliveryCharge = 10;

// ================= STRIPE =================


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Current directory:", process.cwd());
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);


// ================= RAZORPAY =================

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ====================================================
// COD
// ====================================================

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,

      paymentMethod: "COD",

      payment: false,

      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // clear cart

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,

      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

// ====================================================
// USER ORDERS
// ====================================================

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({
      userId,
    });

    res.json({
      success: true,

      orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

// ====================================================
// ADMIN ALL ORDERS
// ====================================================

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({
      success: true,

      orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

// ====================================================
// UPDATE STATUS
// ====================================================

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,

      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

// ====================================================
// STRIPE
// ====================================================

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const {origin} = req.headers;

    const orderData = {
      userId,

      items,

      amount,

      address,

      paymentMethod: "Stripe",

      payment: false,

      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,

        product_data: {
          name: item.name,
        },

        unit_amount: item.price * 100,
      },

      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,

        product_data: {
          name: "Delivery Charges",
        },

        unit_amount: deliveryCharge * 100,
      },

      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,

      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,

      line_items,

      mode: "payment",
    });

    res.json({
      success: true,

      session_url: session.url,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

// ====================================================
// RAZORPAY
// ====================================================

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    await orderModel.findOneAndUpdate(
      { _id: razorpay_order_id },

      { payment: true },
    );

    await userModel.findByIdAndUpdate(
      req.body.userId,

      { cartData: {} },
    );

    res.json({
      success: true,

      message: "Payment verified",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,

      items,

      amount,

      address,

      paymentMethod: "Razorpay",

      payment: false,

      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    const options = {
      amount: amount * 100,

      currency: currency,

      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    res.json({
      success: true,

      order: razorpayOrder,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

// ====================================================

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
  verifyRazorpay
};
