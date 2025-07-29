import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongoose.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();

// MIDDLEWARE

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/v1/user", userRoute);

// SERVER
// sabse phle database se connect karna hai phir server ko start karna hota hai

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
  });
