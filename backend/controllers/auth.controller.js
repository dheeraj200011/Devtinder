import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Set the token as a cookie
  res.cookie("token", token, { httpOnly: true });

  // Return success response
  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
};

export const userLogout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};
