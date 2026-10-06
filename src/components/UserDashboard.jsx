import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    fetch(`${API_URL}/api/user/dashboard`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Session expired. Please log in again.");
        return res.json();
      })
      .then(setUserData)
      .catch((err) => {
        setError(err.message);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      });
  }, [navigate]);

  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!userData) return <div className="text-gray-500 text-center mt-20 font-bold text-xl">Loading your portal...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white shadow-xl mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Hello, {userData.username}! 👋</h1>
          <p className="text-blue-100 text-lg">{userData.message}</p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/roadmap" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🗺️</div>
            <h3 className="text-xl font-bold text-gray-800">Career Roadmap</h3>
            <p className="text-gray-500 text-sm mt-2">Generate your personalized career path based on your interests.</p>
          </Link>
          
          <Link to="/resume" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📄</div>
            <h3 className="text-xl font-bold text-gray-800">Resume Analyzer</h3>
            <p className="text-gray-500 text-sm mt-2">Upload your CV to get an AI-powered score and feedback.</p>
          </Link>

          <Link to="/book" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📅</div>
            <h3 className="text-xl font-bold text-gray-800">Book Session</h3>
            <p className="text-gray-500 text-sm mt-2">Schedule a 1-on-1 video call with our expert counselors.</p>
          </Link>
        </div>

      </div>
    </div>
  );
}