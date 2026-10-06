import { Navigate } from "react-router-dom";

// ✅ Added 'requireAdmin' property (defaults to false)
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 1. If not logged in AT ALL, kick them to the login page
  if (!token) {
    alert("Please log in or create an account to access this feature.");
    return <Navigate to="/login" replace />;
  }

  // 2. If the page requires Admin powers, but they are a normal user, kick them out
  if (requireAdmin && role !== "ADMIN" && role !== "ROLE_ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Otherwise, let them in!
  return children;
}