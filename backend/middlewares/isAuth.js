import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized access: Invalid token" });
  }
};
