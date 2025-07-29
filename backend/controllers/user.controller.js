import User from "../models/user.model.js";

export const userSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
  const { firstName } = req.body;
  try {
    const user = await User.findOne({ firstName });
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
