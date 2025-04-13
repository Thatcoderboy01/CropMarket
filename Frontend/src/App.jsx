import { Routes, Route, Navigate, useLocation } from "react-router-dom"; 
import { useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import CropData from "./components/CropData";
import About from "./components/About";
import FarmerDashboard from "./pages/FarmerDashboard";
import RetailerDashboard from "./pages/RetailerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css";

function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <CropData />
      <About />
    </main>
  );
}

// Private Route Component (Reused for all roles)
const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  console.log("User Data:", user);
  
  if (!user) return <Navigate to="/" replace state={{ from: location }} />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return element;
};

function App() {
  const location = useLocation();

  // Dashboard routes list
  const dashboardRoutes = ["/farmer", "/retailer", "/admin"];

  // Show Navbar/Footer only if NOT on dashboard pages
  const showHeaderFooter = !dashboardRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show Navbar Only If Not On Dashboard */}
      {showHeaderFooter && <Navbar />}

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop-prices" element={<CropData />} />
        <Route path="/how-it-works" element={<Hero />} />
        <Route path="/about-us" element={<About />} />

        {/* Role-Based Dashboard Routes */}
        <Route path="/farmer" element={<PrivateRoute element={<FarmerDashboard />} allowedRoles={["FARMER"]} />} />
        <Route path="/retailer" element={<PrivateRoute element={<RetailerDashboard />} allowedRoles={["RETAILER"]} />} />
        <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} allowedRoles={["ADMIN"]} />} />
      </Routes>

      {/* Show Footer Only If Not On Dashboard */}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;