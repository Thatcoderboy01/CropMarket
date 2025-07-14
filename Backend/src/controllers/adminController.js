import prisma from "../config/prisma.js";
import pkg from '@prisma/client';
const { Role } = pkg;

// Get All Users (Farmers & Retailers)
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullname: true,
                email: true,
                role: true,
                createdAt: true
            },
            orderBy: { createdAt: "desc" }
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users list" });
    }
};

// Get Dashboard Analytics
export const getDashboardStats = async (req, res) => {
    try {
        const totalFarmers = await prisma.user.count({ where: { role: "FARMER" } });
        const totalRetailers = await prisma.user.count({ where: { role: "RETAILER" } });
        const totalRequests = await prisma.request.count();
        const recentActivities = await prisma.user.findMany({ 
            orderBy: { createdAt: "desc" }, 
            take: 5, 
            select: { fullname: true, role: true, createdAt: true }
        });

        res.json({ totalFarmers, totalRetailers, totalRequests, recentActivities });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard stats" });
    }
};

// ✅ block / unblock
export const toggleUserBlock = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { isBlocked: !user.isBlocked }
        });

        res.json({
            message: `User ${updatedUser.fullname} is now ${updatedUser.isBlocked ? "Blocked" : "Unblocked"}`,
            user: updatedUser
        });
    } catch (error) {
        console.error("❌ Toggle User Block Error:", error);
        res.status(500).json({
            message: "Error toggling user block status",
            error: error.message
        });
    }
};


// Set Policy Rules
export const setPolicyRule = async (req, res) => {
    const { key, value } = req.body;

    try {
        await prisma.setting.upsert({
            where: { key },
            update: { value: String(value) },
            create: { key, value: String(value) }
        });

        res.json({ message: `Policy ${key} set to ${value}` });
    } catch (error) {
        res.status(500).json({ message: "Error updating policy rule" });
    }
};

// Get All Policies
export const getPolicies = async (req, res) => {
    try {
        const settings = await prisma.setting.findMany();
        const policies = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {});

        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching policies" });
    }
};