import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongoose.js";
import authRoute from "./routes/auth.route.js";
import profileRoute from "./routes/profile.route.js";
import userRoute from "./routes/user.route.js";
import requestRoute from "./routes/connectionRequest.route.js";

dotenv.config();
const app = express();

// MIDDLEWARE

app.get("/", (req, res) => {
  res.send("backend is runninmg");
});

// Apply CORS middleware

app.use(
  cors({
    origin: ["https://dashdevs.agency/", "https://54.242.172.199/"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ye auth ke liye importanat hai isme cookie store hoti hai

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/profile", profileRoute);
app.use("/v1/user", userRoute); // user route for getting all users
app.use("/v1/request", requestRoute); // request route for sending and accepting friend requests

// SERVER
// sabse phle database se connect karna hai phir server ko start karna hota hai

connectDb()
  .then(() => {
    app.listen(3000 || process.env.PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
  });
