import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 

const Login = ({ setModalType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login API Response:", data); // ✅ Debugging ke liye

      if (response.status === 403) {
        setError("Your account has been blocked by the admin. Please contact support.");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.user || !data.token) {
        throw new Error("Invalid response from server");
      }

      // ✅ Token ko set karna
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      login(data.user, data.token);

      // ✅ Role-based navigation
      const dashboardRoutes = {
        FARMER: "/farmer",
        RETAILER: "/retailer",
        ADMIN: "/admin",
      };

      navigate(dashboardRoutes[data.user.role] || "/");

    } catch (error) {
      console.error("Login Error:", error.message);
      setError(error.message || "Login failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-gray-700 mt-3">
          Don't have an account?
          <button
            type="button"
            className="text-blue-500 hover:underline ml-1"
            onClick={() => setModalType("register")}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;