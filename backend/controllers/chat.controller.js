import Chat from "../models/chat.model.js";

export const getOrCreateChat = async (req, res) => {
  const { id } = req.params; // the other participant
  const userId = req.userId; // logged-in user

  try {
    let chat = await Chat.findOne({
      participants: { $all: [id, userId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName profilePicture",
    });

    if (!chat) {
      chat = new Chat({
        participants: [id, userId],
        messages: [],
      });
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching/creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
