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

  const isPasswordMatch = await user.validatePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = user.getJWT();

  // Set the token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });

  // Return success response
  return res.status(200).json({
    message: "Login successful",
    user,
    token,
  });
};

export const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Use only with HTTPS
    sameSite: "strict", // or "lax"
  });

  return res.status(200).json({ message: "Logout successful" });
};
