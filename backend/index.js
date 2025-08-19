import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongoose.js";
import authRoute from "./routes/auth.route.js";
import profileRoute from "./routes/profile.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chatRoute.js";
import requestRoute from "./routes/connectionRequest.route.js";
import cronJob from "./config/cronjob.js";
import { initScocket } from "./config/socket.config.js";

dotenv.config();
const app = express();
cronJob();

// init socket io
const server = http.createServer(app);
initScocket(server);

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.get("/", (req, res) => {
  res.send("backend is running ✅");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/request", requestRoute);
app.use("/api/v1/chat", chatRoute);

// SERVER
const PORT = process.env.PORT || 3000;
connectDb()
  .then(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database:", error.message);
  });
