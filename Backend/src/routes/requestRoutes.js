import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getAllCrops, sendRequest } from "../controllers/requestController.js";

const router = express.Router();

router.get("/crops", authMiddleware, authorizeRoles("RETAILER"), getAllCrops);
router.post("/send", authMiddleware, authorizeRoles("RETAILER"), sendRequest);

export default router;