import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { getChatMessages } from "../../utils/constants.js";

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(false);
  const [socket, setSocket] = useState(null); // ✅ store socket in state
  const user = useSelector((state) => state.user?.user || null);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(
        getChatMessages + id, // ✅ add id
        { withCredentials: true }
      );
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  // ✅ create ONLINE socket connection
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    setSocket(socket);
    socket.emit("joinUser", userId); // join user to online users set
    socket.on("onlineUser", (userId) => {
      setOnlineUsers(true); // set online status
      console.log("User is online:", userId);
    });
    socket.on("offlineUser", (userId) => {
      setOnlineUsers(false); // set offline status
      console.log("User is offline:", userId);
    });
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [userId]);

  // ✅ setup socket once when `id` or `userId` changes
  useEffect(() => {
    if (!userId) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    // join room
    newSocket.emit("joinchat", { id, userId });

    // listen for messages
    newSocket.on("messageRecieved", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, [id, userId]);

  // ✅ fetch chat messages on mount or when `id` changes
  useEffect(() => {
    if (id) fetchChatMessages();
  }, [id]);

  // ✅ send message through socket
  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    socket.emit("sendMessage", {
      firstname: user?.firstName,
      id,
      userId,
      message,
    });

    setMessage(""); // clear input
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white text-xl font-bold shadow">
        {user?.firstName} {onlineUsers === true ? "(Online)" : "(Offline)"}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-800 text-white p-3 rounded-lg">
            <strong>{msg.firstname || msg.senderId?.firstName}:</strong>{" "}
            {msg.message || msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 flex gap-2 bg-white border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg text-black px-3 py-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
