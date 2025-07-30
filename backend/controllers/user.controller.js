import User from "../models/user.model.js";
import validator from "validator";
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

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    return res
      .status(200)
      .json({ message: "Users fetched successfully", user });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserByName = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "User found", user });
    }
  } catch (error) {
    console.error("Error fetching user by name:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log("Deleting user with ID:", id);
  try {
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, skills } = req.body;

  try {
    // ye basically hume restrict karta hai ki sirf allowed fields hi update ho sake
    const ALLOWED_FIELDS = ["firstName", "lastName", "email", "age", "skills"];

    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Invalid update fields");
    }

    if (skills.length > 5) {
      throw new Error("You can only have a maximum of 5 skills");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        skills,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
