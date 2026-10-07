import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggles between Login and Register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

const API_URL = import.meta.env.VITE_API_URL;
    const endpoint = isLoginMode ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        let errorMsg = `${isLoginMode ? "Login" : "Registration"} failed.`;
        try {
          const errorData = await res.json();
          if (errorData.error) errorMsg = errorData.error;
        } catch (parseErr) {
          console.error("Could not parse error response");
        }
        alert(errorMsg);
        setLoading(false);
        return;
      }

      if (isLoginMode) {
        // --- LOGIN FLOW ---
        const data = await res.json();
        localStorage.setItem("token", data.token);

        if (username === "admin") {
          localStorage.setItem("role", "ADMIN");
          navigate("/admin");
        } else {
          localStorage.setItem("role", "USER");
          navigate("/dashboard");
        }
      } else {
        // --- REGISTRATION FLOW ---
        alert("Account created successfully! You can now log in.");
        setIsLoginMode(true); // Switch to login mode
        setPassword(""); 
      }

    } catch (err) {
      console.error(err);
      alert("Server error. Please make sure your Spring Boot backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="max-w-[420px] w-full bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mt-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLoginMode ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLoginMode 
              ? "Enter your credentials to access your account." 
              : "Sign up to start your career counselling journey."}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Username</label>
            <input
              type="text"
              placeholder={isLoginMode ? "Enter your username" : "Choose a username"}
              required
              value={username}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
            <input
              type="password"
              placeholder={isLoginMode ? "Enter your password" : "Create a strong password"}
              required
              value={password}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#3b5af1] text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70 mt-2"
          >
            {loading ? "Processing..." : (isLoginMode ? "Log In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-gray-700 border-t border-gray-100 pt-6">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setPassword(""); 
            }}
            className="text-[#3b5af1] hover:text-blue-800 hover:underline transition-colors"
          >
            {isLoginMode ? "Sign up here" : "Log in here"}
          </button>
        </div>

      </div>
    </div>
  );
}