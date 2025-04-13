import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Check if JWT_SECRET is defined
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in environment variables.");
  process.exit(1); // Stop the server if JWT_SECRET is not set
}

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    // ✅ Token ka prefix "Bearer " remove karna
    const cleanToken = token.startsWith("Bearer ") ? token.slice(7).trim() : token;

    // ✅ JWT Verify
    const decoded = jwt.verify(cleanToken, JWT_SECRET);
    req.user = decoded; // ✅ Store user info in req object

    // ✅ Debug log (only in development mode)
    if (process.env.NODE_ENV !== "production") {
      console.log("🔹 Decoded User:", req.user);
    }

    next(); // ✅ Move to next middleware or controller
  } catch (error) {
    // ✅ Differentiate error types
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired, please login again" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token, authentication failed" });
    }

    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};