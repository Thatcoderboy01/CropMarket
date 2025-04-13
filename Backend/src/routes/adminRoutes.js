import express from "express";  
const router = express.Router();

import adminAuth from "../middlewares/adminAuth.js";
import { getDashboardStats, toggleUserBlock, setPolicyRule, getPolicies, getAllUsers } from "../controllers/adminController.js";

// Admin APIs
router.get("/dashboard", adminAuth, getDashboardStats);
router.patch("/user/:userId/block", adminAuth, toggleUserBlock);
router.post("/set-policy", adminAuth, setPolicyRule);
router.get("/get-policies", adminAuth, getPolicies);
router.get("/users", adminAuth, getAllUsers);


export default router;