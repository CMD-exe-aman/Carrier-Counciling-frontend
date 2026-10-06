import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(true);
  const [blurLevel, setBlurLevel] = useState(10);
  const lastScroll = useRef(0);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ Read the user's role

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // ✅ Clear role on logout
    navigate("/login");
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const current = window.scrollY;

          setShowNavbar(current <= lastScroll.current || current <= 60);

          lastScroll.current = current;
          setBlurLevel(Math.min(10 + current / 20, 30));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "/book", label: "Book Counselling" },
    { id: "/pricing", label: "Pricing" },
    { id: "/ContactUs", label: "Contact Us" },
    { id: "/about", label: "About Us" },
  ];

  return (
    <motion.nav
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      style={{ backdropFilter: `blur(${blurLevel}px)` }}
      className="fixed top-0 left-0 w-full z-50 bg-white/40 border-b border-white/20"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* ✅ Smart Logo Link: Keeps admins in the dashboard if clicked */}
        <Link to={role === "ADMIN" ? "/admin" : "/"}>
          <h1 className="text-2xl font-bold text-zinc-800 hover:text-blue-600 transition">
            Career Counselling
          </h1>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          
          {/* 🚨 HIDE THESE LINKS IF THE USER IS AN ADMIN */}
          {role !== "ADMIN" && navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              {item.label}
            </button>
          ))}

          {/* LOGIN/LOGOUT BUTTONS */}
          {token ? (
            <button
              onClick={logout}
              className="text-red-500 font-semibold border border-red-500 px-4 py-1 rounded-full hover:bg-red-50 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 font-semibold border border-blue-500 px-4 py-1 rounded-full hover:bg-blue-50 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}