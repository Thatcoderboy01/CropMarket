import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/icons/logo.png";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const mobileMenuRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (menuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { y: -50, opacity: 0, display: "block" },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            mobileMenuRef.current.style.display = "none";
          },
        });
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalType(null);
        document.body.style.overflow = "auto";
      }
    }
    if (modalType) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalType]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-lg shadow-md p-4 flex justify-between items-center z-50">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-10 mr-2" />
          <div className="text-xl font-bold text-gray-700">CropMarket</div>
        </div>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-green-500">Home</Link></li>
          <li><Link to="/crop-prices" className="hover:text-green-500">Crop Prices</Link></li>
          <li><Link to="/how-it-works" className="hover:text-green-500">How It Works</Link></li>
          <li><Link to="/about-us" className="hover:text-green-500">About Us</Link></li>
        </ul>

        <div className="hidden md:flex space-x-4">
          <button 
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setModalType("support")}
          >
            Support
          </button>
          <button 
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => setModalType("login")}
          >
            Login
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-16 left-0 w-full bg-white shadow-lg p-6 md:hidden z-50 hidden"
      >
        <ul className="space-y-4 text-gray-700 font-medium text-center">
          <li><Link to="/" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/crop-prices" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>Crop Prices</Link></li>
          <li><Link to="/how-it-works" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>How It Works</Link></li>
          <li><Link to="/about-us" className="block hover:text-green-500" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li>
            <button 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full"
              onClick={() => {
                setMenuOpen(false);
                setModalType("support");
              }}
            >
              Support
            </button>
          </li>
          <li>
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition w-full"
              onClick={() => {
                setMenuOpen(false);
                setModalType("login");
              }}
            >
              Login
            </button>
          </li>
        </ul>
      </div>

      {/* Modal Popup */}
      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={modalRef} className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setModalType(null)}
            >
              <X size={24} />
            </button>

            {modalType === "login" && <Login setModalType={setModalType} />}
            {modalType === "register" && <Register setModalType={setModalType} />}
            {modalType === "support" && (
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Support Contact</h2>
                <p className="text-gray-700"><strong>Phone:</strong> +91 98765 43210</p>
                <p className="text-gray-700"><strong>Email:</strong> support@cropmarket.com</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
