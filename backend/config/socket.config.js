import { Server } from "socket.io";
import crypto from "crypto";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js"; // Import User model to handle online users
// Note: hum roomId ko hash me create karte hai taki dono user ke room id secure rhe.

const getSecretRoomId = (id, userId) => {
  return crypto
    .createHash("sha256")
    .update([id, userId].sort().join("_"))
    .digest("hex");
};

export const initScocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const onlineUsers = new Set();

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinchat", ({ id, userId }) => {
      const roomId = getSecretRoomId(id, userId); // yha dono user ke room id dsame hone chahiye
      socket.join(roomId); // ye important part hai chat se phle
      console.log(`Client joined room: ${roomId}`);
    });

    const onlineUsers = new Set();

    socket.on("joinUser", async (userId) => {
      socket.userId = userId;
      onlineUsers.add(userId);
      await User.findByIdAndUpdate(userId, { isOnline: true }, { new: true });
      io.emit("onlineUser", userId); // notify all clients about the online user
      console.log("User joined:", userId);
    });

    socket.on("sendMessage", async ({ firstname, id, userId, message }) => {
      // message ko emait karne ke baad room id me bhejna hota hai
      // aisa isliye hota hai ki chat usi room id me hi ho
      const roomId = getSecretRoomId(id, userId);
      console.log(firstname + " " + message);

      // save the message to the database
      try {
        let chat = await Chat.findOne({
          participants: { $all: [id, userId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [id, userId],
            messages: [],
          });
        }
        chat.messages.push({
          senderId: userId,
          text: message,
        });
        await chat.save();
      } catch (error) {
        console.error("Error saving message:", error);
      }

      // yha jo bhi message aaye frontend se use hum frontend par show karne ke liye bhej rhe hai
      io.to(roomId).emit("messageRecieved", { firstname, message });
    });

    socket.on("disconnect", async () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        await User.findByIdAndUpdate(
          socket.userId,
          { isOnline: false },
          { new: true }
        );
        io.emit("offlineUser", socket.userId); // notify all clients about the offline user
      }
      console.log("Client disconnected");
    });
  });

  return io;
};
