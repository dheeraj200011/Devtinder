import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";

export const getUser = async (req, res) => {
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

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const { firstName, lastName, skills, age, gender, description, photoUrl } =
    req.body;

  try {
    // ye basically hume restrict karta hai ki sirf allowed fields hi update ho sake
    const ALLOWED_FIELDS = [
      "firstName",
      "lastName",
      "age",
      "skills",
      "gender",
      "description",
      "photoUrl",
    ];

    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Invalid update fields");
    }

    if (skills.length > 5) {
      throw new Error("You can only have a maximum of 5 skills");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, skills, age, gender, description, photoUrl },
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

export const updatePassword = async (req, res) => {
  const userId = req.userId;
  const { currentpassword, newPassword } = req.body;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const prevPassword = await bcrypt.compare(
      currentpassword,
      existingUser.password
    );
    if (!prevPassword) {
      res.send("user is not authenticated!!!");
    }

    if (!validator.isStrongPassword(newPassword)) {
      res.status(400).send("password is not strong");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ message: "User password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
