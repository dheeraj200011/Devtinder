import RequestModel from "../models/connectionRequest.model.js";
import User from "../models/user.model.js";

export const sendConnectionRequest = async (req, res) => {
  const toUserId = req.params.touserId;
  const fromUserId = req.userId;
  const status = req.params.status;

  try {
    if (!toUserId || !fromUserId) {
      return res.status(400).json({ message: "Missing user IDs" });
    }

    if (fromUserId === toUserId) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself" });
    }

    const toUser = await User.findById(toUserId);
    const fromUser = await User.findById(fromUserId);

    if (!toUser || !fromUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const existingConnection = await RequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnection) {
      return res.status(400).json({ message: "Connection already exists" });
    }

    const newConnection = await RequestModel.create({
      fromUserId,
      toUserId,
      status,
    });

    const populatedConnection = await RequestModel.findById(newConnection._id)
      .populate("fromUserId", "firstName lastName photoUrl")
      .populate("toUserId", "firstName lastName photoUrl");

    return res.status(201).json({
      message: `${fromUser.firstName} is ${status} ${toUser.firstName}`,
      data: populatedConnection,
    });
  } catch (error) {
    console.error("Error making connection:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const reviewConnectionRequest = async (req, res) => {
  const loggedInUser = req.userId;
  const { requestId, status } = req.params;

  const allowedStatuses = ["accepted", "rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid request status" });
  }

  try {
    const connectionRequest = await RequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser,
      status: "interested",
    });

    if (!connectionRequest) {
      return res
        .status(404)
        .json({ message: "Request not found or already reviewed" });
    }

    connectionRequest.status = status;
    await connectionRequest.save();

    return res.status(200).json({ message: `Request ${status} successfully` });
  } catch (error) {
    console.error("Error reviewing connection request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
