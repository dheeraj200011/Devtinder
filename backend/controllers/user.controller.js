import User from "../models/user.model.js";
import RequestModel from "../models/connectionRequest.model.js";

export const getAllUsers = async (req, res) => {
  const loggedInUser = req.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const connectionRequests = await RequestModel.find({
      $or: [{ fromUserId: loggedInUser }, { toUserId: loggedInUser }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    hideUsersFromFeed.add(loggedInUser); // ✅ add self for clarity

    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    })
      .select("firstName lastName photoUrl age gender")
      .skip(skip)
      .limit(limit);

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const allConnections = async (req, res) => {
  const userId = req.userId;

  try {
    const loggedInUser = await User.findById(userId);
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const allConnection = await RequestModel.find({
      status: "accepted",
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "description",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "description",
      ]);

    const data = allConnection.map((row) => {
      const fromId = row.fromUserId._id.toString();
      const toId = row.toUserId._id.toString();

      return fromId === userId ? row.toUserId : row.fromUserId;
    });

    return res.status(200).json(data); //
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRequests = async (req, res) => {
  const userId = req.userId;

  try {
    const loggedInUser = await User.findById(userId);

    const userRequests = await RequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "description",
    ]);

    if (!userRequests || userRequests.length === 0) {
      return res.status(404).json({ message: "No requests found" });
    }

    res.status(200).json({ userRequests });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
