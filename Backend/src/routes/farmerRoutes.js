import express from "express";
import { addFarmer } from "../controllers/farmerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";  // ✅ Import middleware

const router = express.Router();

// ✅ authMiddleware ko route me use karo
router.post("/", authMiddleware, addFarmer);

export default router;