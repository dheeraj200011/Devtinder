import RequestModel from "../models/connectionRequest.model.js";
import User from "../models/user.model.js";

export const sendConnectionRequest = async (req, res) => {
  const toUserId = req.params.touserId;
  const fromUserId = req.userId;
  const status = req.params.status;

  const fromUser = await User.findById(fromUserId);

  try {
    // Check required values
    if (!toUserId || !fromUserId) {
      return res.status(400).json({ message: "Missing user IDs" });
    }

    // Prevent user from sending request to themselves
    if (fromUserId === toUserId) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself" });
    }

    // Check if target user exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Check if connection already exists
    const existingConnection = await RequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnection) {
      return res.status(400).json({ message: "Connection already exists" });
    }

    // Create new connection request with default 'pending' status
    const newConnection = await RequestModel.create({
      fromUserId,
      toUserId,
      status,
    });

    return res.status(201).json({
      message: `${fromUser.firstName} is ${status} ${toUser.firstName} `,
      data: newConnection,
    });
  } catch (error) {
    console.error("Error making connection:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
