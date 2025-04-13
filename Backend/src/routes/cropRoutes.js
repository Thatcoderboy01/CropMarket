import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
  addCrop,
  getMyCrops,
  deleteCrop,
  updateCrop,
  updateRequestStatus,
} from "../controllers/cropController.js";

const router = express.Router();

router.post("/add", authMiddleware, authorizeRoles("FARMER"), addCrop);
router.get("/my-crops", authMiddleware, authorizeRoles("FARMER"), getMyCrops);
router.delete("/delete/:cropId", authMiddleware, authorizeRoles("FARMER"), deleteCrop);
router.put("/update/:cropId", authMiddleware, authorizeRoles("FARMER"), updateCrop);
router.put("/request-status", authMiddleware, authorizeRoles("FARMER"), updateRequestStatus);

export default router;