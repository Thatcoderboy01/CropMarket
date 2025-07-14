import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// 🔁 Routes import
import authRoutes from "./src/routes/authRoutes.js";
import cropRoutes from "./src/routes/cropRoutes.js";
import requestRoutes from "./src/routes/requestRoutes.js";
import farmerRoutes from "./src/routes/farmerRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

// 🔧 App setup
const app = express();
const server = http.createServer(app); // Create HTTP server instance

// 🌐 CORS Setup for both development and production
app.use(
  cors({
    origin: [
      "http://localhost:5173",                // Dev frontend
      "https://crop-market.vercel.app",       // ✅ Your Vercel deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

// 📦 Routes
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/admin", adminRoutes);

// 🔌 Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",                // Dev frontend
      "https://crop-market.vercel.app",       // ✅ Vercel frontend for sockets
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("📨 Message received:", data);
    io.emit("receiveMessage", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// 🌐 Default route (optional for testing)
app.get("/", (req, res) => {
  res.send("CropMarket Backend is running ✅");
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
