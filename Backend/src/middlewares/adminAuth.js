import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        console.log("Authorization Header:", authHeader);  // ✅ Log Authorization Header

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.error("❌ No Token Found");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1]; // ✅ Extract token
        console.log("Extracted Token:", token);  // ✅ Log Extracted Token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);  // ✅ Log Decoded Token

        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        console.log("Fetched User from DB:", user);  // ✅ Log user details

        if (!user || user.role !== "ADMIN") {
            console.error("❌ Access Denied: User is not an Admin");
            return res.status(403).json({ message: "Access Denied" });
        }

        if (user.isBlocked) {
            console.error("❌ Access Denied: User is Blocked");
            return res.status(403).json({ message: "User is blocked" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ message: "Invalid Token" });
    }
};

export default adminAuth;