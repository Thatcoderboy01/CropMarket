import prisma from "../config/prisma.js";  // ✅ Prisma Import

export const addFarmer = async (req, res) => {
    try {
        const { userId, address, latitude, longitude } = req.body;

        if (!userId || !address || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const farmer = await prisma.farmer.create({
            data: { userId, address, latitude, longitude }
        });

        res.status(201).json(farmer);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
