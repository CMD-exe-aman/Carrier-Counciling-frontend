import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    fetch(`${API_URL}/api/admin/stats`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized access. Please log in again.");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        setError(err.message);
        if (err.message.includes("Unauthorized")) {
           localStorage.removeItem("token");
           localStorage.removeItem("role");
           navigate("/login");
        }
      });
  }, [navigate]);

  const handleDelete = async (type, id) => {
    if (!id) {
      alert("Cannot delete: Invalid ID");
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}? This cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const res = await fetch(`${API_URL}/api/admin/${type}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) throw new Error("Failed to delete record.");

      // Instantly update the UI
      setData((prevData) => {
        if (type === "bookings") {
          return {
            ...prevData,
            bookings: prevData.bookings.filter((b) => b.id !== id),
            totalBookings: prevData.totalBookings - 1,
          };
        } else if (type === "users") {
          return {
            ...prevData,
            users: prevData.users.filter((u) => u.id !== id),
            totalUsers: prevData.totalUsers - 1,
          };
        } else {
          return {
            ...prevData,
            contacts: prevData.contacts.filter((c) => c.id !== id),
            totalContacts: prevData.totalContacts - 1,
          };
        }
      });

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-20">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white p-6 shadow-xl z-10">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span></span> Admin Panel
        </h2>
        <nav className="space-y-3">
          <button 
            onClick={() => setActiveTab("overview")} 
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "overview" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            📊 Overview
          </button>
          <button 
            onClick={() => setActiveTab("users")} 
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "users" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            👥 Users Database
          </button>
          <button 
            onClick={() => setActiveTab("bookings")} 
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "bookings" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            📅 Bookings
          </button>
          <button 
            onClick={() => setActiveTab("contacts")} 
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "contacts" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            ✉️ Contact Messages
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {error && <p className="text-red-600 bg-red-50 p-4 rounded-lg mb-6 border border-red-200">{error}</p>}

        {!data && !error ? (
          <div className="text-gray-500 font-medium text-lg">Loading secure systems...</div>
        ) : data && (
          <>
            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-extrabold text-gray-800 mb-6">System Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
                    <h3 className="text-gray-500 font-bold uppercase text-sm tracking-wider">Registered Users</h3>
                    <p className="text-5xl font-black text-gray-900 mt-2">{data.totalUsers || 0}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                    <h3 className="text-gray-500 font-bold uppercase text-sm tracking-wider">Total Bookings</h3>
                    <p className="text-5xl font-black text-gray-900 mt-2">{data.totalBookings || 0}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
                    <h3 className="text-gray-500 font-bold uppercase text-sm tracking-wider">Total Inquiries</h3>
                    <p className="text-5xl font-black text-gray-900 mt-2">{data.totalContacts || 0}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: USERS */}
            {activeTab === "users" && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Registered Users</h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-4 font-semibold border-b">ID</th>
                        <th className="p-4 font-semibold border-b">Username</th>
                        <th className="p-4 font-semibold border-b">Role</th>
                        <th className="p-4 font-semibold border-b text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users && data.users.length > 0 ? (
                        data.users.map((user, idx) => (
                          <tr key={user.id || idx} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-4 text-gray-500">{user.id}</td>
                            <td className="p-4 font-medium text-gray-900">{user.username}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                {user.role || 'USER'}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              {user.username !== "admin" && (
                                <button 
                                  onClick={() => handleDelete("users", user.id)}
                                  className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition-colors font-medium text-sm"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="p-6 text-center text-gray-500">No users found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: BOOKINGS */}
            {activeTab === "bookings" && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-4 font-semibold border-b">ID</th>
                        <th className="p-4 font-semibold border-b">Name</th>
                        <th className="p-4 font-semibold border-b">Email</th>
                        <th className="p-4 font-semibold border-b">Phone</th>
                        <th className="p-4 font-semibold border-b">Message</th>
                        <th className="p-4 font-semibold border-b text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.bookings && data.bookings.length > 0 ? (
                        data.bookings.map((booking, idx) => (
                          <tr key={booking.id || idx} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-4 text-gray-500">{booking.id}</td>
                            <td className="p-4 font-medium text-gray-900">{booking.name}</td>
                            <td className="p-4 text-blue-600">{booking.email}</td>
                            <td className="p-4 text-gray-600">{booking.phone}</td>
                            <td className="p-4 text-gray-600 truncate max-w-xs">{booking.message}</td>
                            <td className="p-4 text-center">
                              <button 
                                onClick={() => handleDelete("bookings", booking.id)}
                                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition-colors font-medium text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="6" className="p-6 text-center text-gray-500">No bookings found in database.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: CONTACTS */}
            {activeTab === "contacts" && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Messages</h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-4 font-semibold border-b">ID</th>
                        <th className="p-4 font-semibold border-b">Name</th>
                        <th className="p-4 font-semibold border-b">Email</th>
                        <th className="p-4 font-semibold border-b">Subject</th>
                        <th className="p-4 font-semibold border-b">Message</th>
                        <th className="p-4 font-semibold border-b text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.contacts && data.contacts.length > 0 ? (
                        data.contacts.map((contact, idx) => (
                          <tr key={contact.id || idx} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-4 text-gray-500">{contact.id}</td>
                            <td className="p-4 font-medium text-gray-900">{contact.name}</td>
                            <td className="p-4 text-blue-600">{contact.email}</td>
                            <td className="p-4 text-gray-800 font-medium">{contact.subject}</td>
                            <td className="p-4 text-gray-600 truncate max-w-xs">{contact.message}</td>
                            <td className="p-4 text-center">
                              <button 
                                onClick={() => handleDelete("contacts", contact.id)}
                                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition-colors font-medium text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="6" className="p-6 text-center text-gray-500">No contact requests found in database.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}