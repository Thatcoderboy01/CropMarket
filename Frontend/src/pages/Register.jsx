import { useState } from "react";
import { registerUser } from "../services/authService";

const Register = ({ setModalType }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser({ 
        fullName, 
        email, 
        password, 
        role: role.toUpperCase() // ✅ Backend ENUM match karega
      });

      if (res.success) {
        setError(""); // Clear any previous error
        alert("Registration Successful! Please login."); // Show success alert

        // After 1 second, switch to login modal
        setTimeout(() => {
          setModalType("login");
        }, 1000); // 1 second delay before switching to login modal
      } else {
        setError(res?.message || "Registration failed! Please try again.");
      }
    } catch (err) {
      setError("Something went wrong! Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Register</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
          required
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 bg-white text-gray-700"
          required
        >
          <option value="">Select Role</option>
          <option value="FARMER">Farmer</option>
          <option value="RETAILER">Retailer</option>
        </select>

        <button 
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-700 mt-3">
          Already have an account? 
          <button 
            type="button"
            className="text-green-500 hover:underline ml-1"
            onClick={() => setModalType("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;