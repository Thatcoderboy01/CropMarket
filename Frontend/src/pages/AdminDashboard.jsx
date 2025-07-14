import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import profilePic from "../assets/images/RiteshRay01.jpg";
import axios from "axios";
import PolicyModal from "../model components/PolicyModal";


const AdminDashboard = () => {
  const [data, setData] = useState({ farmers: [], retailers: [] });
  const [users, setUsers] = useState([]);
  const [policy, setPolicy] = useState({ key: "", value: "" });
  const [fetchedPolicy, setFetchedPolicy] = useState({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔹 Fetch all users (Fixed)
const fetchAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://cropmarket-hfds.onrender.com/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Fix: Safely handle array or nested array
    if (Array.isArray(res.data)) {
      setUsers(res.data);
    } else if (Array.isArray(res.data.users)) {
      setUsers(res.data.users);
    } else {
      console.warn("Unexpected user response format:", res.data);
      setUsers([]);
    }
  } catch (error) {
    console.error("Failed to fetch users", error);
    setUsers([]); // fallback
  }
};


  // 🔹 Fetch policy
  const handleGetPolicy = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://cropmarket-hfds.onrender.com/api/admin/get-policies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFetchedPolicy(res.data.policy || {});
    } catch (error) {
      console.error("Failed to get policy", error);
    }
  };

  // 🔹 Set policy
  const handleSetPolicy = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://cropmarket-hfds.onrender.com/api/admin/set-policy",
        policy,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Policy updated!");
      handleGetPolicy(); // 🟢 Fetch updated policy
    } catch (error) {
      console.error("Failed to set policy", error);
    }
  };

    // 🔹 Analytics 
  const [dashboardStats, setDashboardStats] = useState({
    totalFarmers: 0,
    totalRetailers: 0,
    totalRequests: 0,
    recentActivities: [],
  });
  
  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://cropmarket-hfds.onrender.com/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardStats(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

    useEffect(() => {
    fetchAllUsers();
    fetchDashboardStats(); // 👈
    handleGetPolicy(); // 👈 auto fetch policy
  }, []);

  // 🔓 Unblock user
const handleUnblockUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `https://cropmarket-hfds.onrender.com/api/admin/user/${userId}/unblock`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(`User ${userId} unblocked`);
    fetchAllUsers();
  } catch (error) {
    console.error("Failed to unblock user", error);
  }
};



  // 🔹 Block user
  const handleBlockUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://cropmarket-hfds.onrender.com/api/admin/user/${userId}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`User ${userId} blocked`);
      fetchAllUsers();
    } catch (error) {
      console.error("Failed to block user", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl px-6 py-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <ShieldAlert className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-2 shadow-md">
          <img
            src={profilePic}
            alt="Admin Profile"
            className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">Ritesh Ray</span>
            <span className="text-xs text-gray-500">ritesh0711@gmail.com</span>
            <button
              onClick={handleLogout}
              className="mt-2 text-xs text-red-600 hover:underline font-medium w-fit"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* 📊 Dashboard Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
       <div className="bg-white rounded-2xl shadow-md p-5 text-center">
          <h4 className="text-sm text-gray-500 mb-1">Total Farmers</h4>
          <p className="text-3xl font-bold text-green-600">{dashboardStats.totalFarmers}</p>
       </div>
       <div className="bg-white rounded-2xl shadow-md p-5 text-center">
         <h4 className="text-sm text-gray-500 mb-1">Total Retailers</h4>
         <p className="text-3xl font-bold text-blue-600">{dashboardStats.totalRetailers}</p>
       </div>
       <div className="bg-white rounded-2xl shadow-md p-5 text-center">
         <h4 className="text-sm text-gray-500 mb-1">Active Requests</h4>
         <p className="text-3xl font-bold text-purple-600">{dashboardStats.totalRequests}</p>
       </div>
      </section>


      {/* 🧾 Policy & Control Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {/* 🔐 Set Policy */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Set Policy</h3>
          <input
            type="text"
            placeholder="Policy Key"
            value={policy.key}
            onChange={(e) => setPolicy({ ...policy, key: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Policy Value"
            value={policy.value}
            onChange={(e) => setPolicy({ ...policy, value: e.target.value })}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            onClick={handleSetPolicy}
            className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Submit Policy
          </button>
        </div>

        {/* 📜 Get Policy */}
<div className="bg-white rounded-2xl shadow-md p-5">
  <h3 className="font-bold text-lg mb-3 text-gray-700 text-center">📜 Current Policy</h3>

  <button
    onClick={handleGetPolicy}
    className="w-full py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
  >
    Fetch Policy
  </button>

  {fetchedPolicy && Object.keys(fetchedPolicy).length > 0 ? (
    <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-800">
      {Object.entries(fetchedPolicy).map(([key, value]) => (
        <div key={key} className="mb-1">
          <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{" "}
          <span className="text-gray-700">{value.toString()}</span>
        </div>
      ))}
    </div>
  ) : (
    fetchedPolicy && (
      <div className="mt-4 text-sm text-red-500 text-center">
        ❗ No policy data found
      </div>
    )
  )}
</div>


        {/* 👥 Get All Users */}
        <div className="bg-white rounded-2xl shadow-md p-5 col-span-1 lg:col-span-2">
          <h3 className="font-bold text-lg mb-3 text-gray-700">All Users</h3>
          <div className="max-h-60 overflow-y-auto text-sm text-gray-700">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((u) => (
                <div
                  key={u.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p className="font-medium">{u.name || u.fullName}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                  {u.isBlocked ? (
  <button
    onClick={() => handleUnblockUser(u.id)}
    className="text-xs px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
  >
    Unblock
  </button>
) : (
  <button
    onClick={() => handleBlockUser(u.id)}
    className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  >
    Block
  </button>
)}

                </div>
              ))
            ) : (
              <p className="text-gray-500">No users found.</p>
            )}
          </div>
        </div>
      </section>
          {/* 📝 Recent Activities */}
          <section className="bg-white rounded-2xl shadow-md p-5 mb-10">
  <h3 className="font-bold text-lg mb-4 text-gray-700">Recent Activities</h3>
  <div className="max-h-60 overflow-y-auto text-sm text-gray-700">
    {Array.isArray(dashboardStats.recentActivities) && dashboardStats.recentActivities.length > 0 ? (
      dashboardStats.recentActivities.map((activity, idx) => (
        <div key={idx} className="border-b py-2">
          {typeof activity === "object" && activity !== null ? (
            <p>
              <strong>{activity.fullname}</strong> ({activity.role}) -{" "}
              <span className="text-xs text-gray-500">
                {new Date(activity.createdAt).toLocaleString()}
              </span>
            </p>
          ) : (
            <p>{activity}</p>
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-500">No recent activities available.</p>
    )}
  </div>
</section>

    </div>
  );
};

export default AdminDashboard;