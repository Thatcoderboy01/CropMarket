import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import AddCropModal from "../model components/AddCropModal.jsx";
import UpdateCropModal from "../model components/UpdateCropModal.jsx";
import ChatBox from "../components/ChatBox";

const FarmerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchCrops();
      fetchRequests();
    }
  }, [user]);

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

  const fetchCrops = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://cropmarket-hfds.onrender.com/api/crops/my-crops", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setCrops(data.crops);
    } catch (error) {
      console.error("Failed to fetch crops:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://cropmarket-hfds.onrender.com/api/requests/my-requests", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setRequests(data.requests);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  const handleRequest = async (requestId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://cropmarket-hfds.onrender.com/api/crops/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, status }),
      });

      if (response.ok) {
        alert(`Request ${status === "accepted" ? "Accepted" : "Rejected"}!`);
        setRequests((prev) => prev.filter((req) => req.id !== requestId));
      }
    } catch (error) {
      console.error("Failed to update request:", error);
    }
  };

  const addCrop = (crop) => {
    setCrops([...crops, crop]);
    setIsModalOpen(false);
  };

  const updateCrop = (updatedCrop) => {
    setCrops((prevCrops) =>
      prevCrops.map((crop) =>
        crop.id === updatedCrop.id ? { ...crop, ...updatedCrop } : crop
      )
    );
    setIsUpdateModalOpen(false);
    setEditingCrop(null);
  };

  const deleteCrop = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://cropmarket-hfds.onrender.com/api/crops/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setCrops(crops.filter((crop) => crop.id !== id));
        alert("Crop deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete crop:", error);
    }
  };

  const openEditModal = (crop) => {
    setEditingCrop(crop);
    setIsUpdateModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold text-blue-600">CropMarket</h1>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h2 className="text-lg font-bold text-gray-700">Farmer Dashboard</h2>
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

      {/* Hero Section */}
      <div className="bg-blue-50 py-6 text-center shadow-inner">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          👋 Welcome {user?.fullName || "Farmer"} to{" "}
          <span className="text-blue-600">CropMarket</span>
        </h2>
      </div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Add Crop */}
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-3">🌾 Add New Crop</h2>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditingCrop(null);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add Crop
          </button>
        </motion.div>

        {/* Retailer Requests */}
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-3">📩 Retailer Requests</h2>
          <ul>
            {requests.length ? (
              requests.map((req) => (
                <li key={req.id} className="mb-2 p-3 bg-gray-100 rounded-md">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-semibold">{req.retailerName}</span> wants{" "}
                    <span className="font-semibold">{req.cropName}</span> at ₹
                    {req.offeredPrice}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleRequest(req.id, "accepted")}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      ✅ Accept
                    </button>
                    <button
                      onClick={() => handleRequest(req.id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No requests found</p>
            )}
          </ul>
        </motion.div>

        {/* Crop Management */}
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-3">📊 Manage Crops</h2>
          <ul>
            {crops.length ? (
              crops.map((crop) => (
                <li key={crop.id} className="mb-2 p-3 bg-gray-100 rounded-md">
                  {crop.name} - {crop.quantity}kg - ₹{crop.price}
                  <button
                    onClick={() => deleteCrop(crop.id)}
                    className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    🗑 Delete
                  </button>
                  <button
                    onClick={() => openEditModal(crop)}
                    className="ml-2 bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    ✏ Edit
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No crops found</p>
            )}
          </ul>
        </motion.div>
      </div>

      {/* Modals */}
      <AddCropModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        addCrop={addCrop}
        isEdit={false}
        initialData={null}
      />

      <UpdateCropModal
        isOpen={isUpdateModalOpen}
        closeModal={() => {
          setIsUpdateModalOpen(false);
          setEditingCrop(null);
        }}
        onUpdate={updateCrop}
        initialData={editingCrop}
      />

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

export default FarmerDashboard;