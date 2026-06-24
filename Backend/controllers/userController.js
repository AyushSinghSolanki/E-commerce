import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// =======================
// CREATE TOKEN
// =======================
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// =======================
// LOGIN USER
// =======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. check user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // 2. check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. create token
    const token = createToken(user._id);

    return res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =======================
// REGISTER USER
// =======================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. check if user exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // 2. validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email",
      });
    }

    // 3. password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password too weak (min 8 chars)",
      });
    }

    // 4. hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // 6. token
    const token = createToken(user._id);

    return res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// ADMIN LOGIN (dummy for now)
// =======================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid admin credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, registerUser, adminLogin };