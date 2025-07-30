import User from "../models/user.model.js";

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
