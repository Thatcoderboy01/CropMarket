import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import dotenv from "dotenv";
import { Role } from "@prisma/client"; // ✅ Prisma ENUM Import

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ✅ Utility: Email Validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ Utility: Password Validation
const validatePassword = (password) => {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[\W_]/.test(password);
};

// ✅ Utility: Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
};

// 🚀 **User Registration**
export const registerUser = async (req, res) => {
  try {
    let { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.trim().toLowerCase(); // ✅ Email cleanup

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character",
      });
    }

    role = role.toUpperCase();
    if (!Object.values(Role).includes(role)) {
      return res.status(400).json({ message: "Invalid role, must be FARMER or RETAILER" });
    }

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert User into DB
    const newUser = await prisma.user.create({
      data: { fullname: fullName, email, password: hashedPassword, role },
    });

    // ✅ Farmer/Retailer Table Me Insert
    if (role === "FARMER") {
      await prisma.farmer.create({
        data: { userId: newUser.id, address: "Default Address", latitude: 23.4567, longitude: 87.6543 }
      });
    } else if (role === "RETAILER") {
      await prisma.retailer.create({
        data: { userId: newUser.id, companyName: "Default Retailer", location: "Default Location" }
      });
    }

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account is blocked. Please contact support." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullname,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // ✅ Check if admin account is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: "Your admin account has been blocked. Please contact support." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Admin login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullname,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🚀 **Get User Profile**
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, fullname: true, email: true, role: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🚀 **Middleware: Authenticate Token**
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};