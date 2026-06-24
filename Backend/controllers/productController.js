import path from "path";
import fs from "fs";

import { v2 as cloudinary } from "cloudinary";

import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Get images
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    // Upload all images to Cloudinary
    const imageUrls = [];

    for (const file of images) {
      const absolutePath = path.resolve(file.path);

      const result = await cloudinary.uploader.upload(absolutePath, {
        folder: "products",
        resource_type: "image",
      });

      imageUrls.push(result.secure_url);

      // Delete local file
      try {
        fs.unlinkSync(absolutePath);
      } catch (err) {
        console.log("Delete error:", err.message);
      }
    }

    // Create product object
    const productData = {
      name,
      description,

      price: Number(price),

      category,

      subCategory,

      sizes: sizes ? JSON.parse(sizes) : [],

      bestseller: bestseller === "true",

      image: imageUrls,

      date: Date.now(),
    };

    // Save in MongoDB
    await productModel.create(productData);

    res.json({
      success: true,
      message: "Product added successfully",
      imageUrls,
    });
    console.log("Product added successfully !!!!");
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { productId } = req.body;

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    console.log("DELETED:", deletedProduct);

    if (!deletedProduct) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
