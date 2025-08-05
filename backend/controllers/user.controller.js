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
    }).select("fromUserId touserId");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser } },
      ],
    })
      .select("firstName lastName photoUrl age gender ")
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
  const loggedInUser = await User.findById(userId);

  try {
    const allConnection = await RequestModel.find({
      toUserId: loggedInUser._id,
      fromUserId: loggedInUser._id,
      status: "accepted",
    })
      .populate("fromUserId", ["firstName", "LastName"])
      .populate("toUserId", ["firstName", "LastName"]);

    const data = allConnection.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      row.fromUserId;
    });
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRequests = async (req, res) => {
  const userId = req.userId;
  const loggedInUser = await User.findById(userId);
  try {
    const userRequets = await RequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "LastName"]);
    if (!userRequets) {
      res.status(400).json({ message: "No Request Found" });
    } else {
      res.status(200).json({ userRequets });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
