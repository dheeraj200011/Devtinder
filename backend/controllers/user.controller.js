import User from "../models/user.model.js";

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
