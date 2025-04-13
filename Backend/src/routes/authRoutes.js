import express from "express";
import { registerUser, loginUser, adminLogin } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ **Public Routes (No Auth Required)**
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", adminLogin);

// ✅ **Protected Route Example (Requires JWT)**
router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({ 
    message: "Welcome to Dashboard!", 
    user: req.user 
  });
});

// ✅ **Export Router**
export default router;
