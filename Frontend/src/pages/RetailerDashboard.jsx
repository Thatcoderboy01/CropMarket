import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";

const RetailerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ cropId: "", priceOffered: "" });
  const [message, setMessage] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [crops, setCrops] = useState([]);

  const chatRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://cropmarket-hfds.onrender.com/api/requests/crops", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedCrops = Array.isArray(response.data)
          ? response.data
          : response.data.crops || [];

        setCrops(fetchedCrops);
      } catch (error) {
        console.error("Error fetching crops:", error);
        if (error.response?.status === 401) {
          alert("Unauthorized! Please login again.");
        }
      }
    };

    fetchCrops();
  }, []);

  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const sendRequest = async () => {
    const { cropId, priceOffered } = newRequest;

    if (!cropId || !priceOffered) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ User not authenticated!");
      return;
    }

    try {
      const res = await fetch("https://cropmarket-hfds.onrender.com/api/requests/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cropId, priceOffered }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send request");

      setRequests([...requests, data.request]);
      setNewRequest({ cropId: "", priceOffered: "" });
      setMessage("✅ Request sent successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("❌ Error:", err.message);
      setMessage("❌ " + err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleProfile = () => setShowProfile(!showProfile);
  const toggleChat = () => setShowChat(!showChat);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false);
      }
    };

    if (showChat) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showChat]);

  const handleCropClick = (crop) => {
    setNewRequest({
      cropId: crop.id,
      priceOffered: crop.price,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold text-blue-600">CropMarket</h1>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h2 className="text-lg font-bold text-gray-700">Retailer Dashboard</h2>
        </div>

        <div className="flex items-center gap-3 relative">
          <motion.button
            onClick={toggleChat}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600"
          >
            <BsChatDots className="text-lg" />
            Chat
          </motion.button>

          <div onClick={toggleProfile} className="flex items-center gap-2 cursor-pointer">
            <FaUserCircle className="text-3xl text-gray-600" />
            <span className="font-semibold text-gray-800">
              {user?.fullName || "N/A"}
            </span>
          </div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-14 w-64 bg-white shadow-lg rounded-lg p-4 z-20"
              >
                <p className="text-sm text-gray-600 mb-1">
                  👤 <strong>{user?.fullName || "N/A"}</strong>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  📧 {user?.email || "N/A"}
                </p>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="bg-blue-50 py-6 text-center shadow-inner">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          👋 Welcome {user?.fullName || "Retailer"} to{" "}
          <span className="text-blue-600">CropMarket</span>
        </h2>
      </div>

      <div className="container mx-auto p-6">
        {/* ✅ Send Request Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📩 Send Crop Request</h2>

          {message && (
            <p className="text-center mb-3 font-semibold text-green-600">
              {message}
            </p>
          )}

          <select
            name="cropId"
            value={newRequest.cropId}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full mb-2 rounded"
          >
            <option value="">Select Crop</option>
            {crops.map((crop) => (
              <option key={crop.id} value={crop.id}>
                {crop.name} - ₹{crop.price} by {crop.farmer?.name || `Farmer ID: ${crop.farmerId}`}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="priceOffered"
            placeholder="Proposed Price"
            value={newRequest.priceOffered}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full mb-4 rounded"
          />

          <motion.button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            whileTap={{ scale: 0.95 }}
            onClick={sendRequest}
          >
            Send Request
          </motion.button>
        </div>

        {/* Track Deals Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📊 Track Deals</h2>
          {requests.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {requests.map((req, index) => (
                <li key={index} className="py-2 text-gray-700">
                  🌱 <strong>{req.cropType}</strong> — 💰 ₹{req.price} — 👨‍🌾 Farmer ID:{" "}
                  <strong>{req.farmerId}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No active requests</p>
          )}
        </div>

        {/* All Crops Display Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🌾 All Available Crops</h2>
          {crops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer hover:bg-blue-50"
                  onClick={() => handleCropClick(crop)}
                >
                  <p><strong>Crop:</strong> {crop.name}</p>
                  <p><strong>Quantity:</strong> {crop.quantity} kg</p>
                  <p><strong>Price:</strong> ₹{crop.price}</p>
                  <p><strong>Farmer:</strong> {crop.farmer?.name || `ID: ${crop.farmerId}`}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No crops available at the moment.</p>
          )}
        </div>
      </div>

      {/* Chat Popup */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 bg-white rounded-xl shadow-xl z-50 w-[400px] h-[500px] overflow-hidden border"
          >
            <div className="flex justify-between items-center bg-blue-600 text-white p-3">
              <h3 className="font-semibold">Chat Box</h3>
              <button onClick={toggleChat} className="text-white font-bold text-lg">
                ×
              </button>
            </div>
            <ChatBox />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RetailerDashboard;
