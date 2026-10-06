import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Payment from "./components/Payment"; 
import MultiStepForm from "./components/MultiStepForm";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RoadmapGenerator from "./components/RoadmapGenerator"; 

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* === PUBLIC ROUTES === */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
            </>
          }
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ContactUs" element={<section className="pt-24 pb-10"><ContactUs /></section>} />
        <Route path="/about" element={<section className="pt-24 pb-10"><About /></section>} />
        <Route path="/login" element={<Login />} />

        {/* === PROTECTED ROUTES (Requires any logged-in user) === */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <section className="pt-24 pb-10">
                <MultiStepForm />
              </section>
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <section className="pt-24 pb-10 min-h-screen bg-gray-50 flex items-center justify-center">
                <RoadmapGenerator />
              </section>
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <section className="pt-24 pb-10 min-h-screen bg-gray-50 flex items-center justify-center">
                <ResumeAnalyzer />
              </section>
            </ProtectedRoute>
          }
        />

        {/* === ADMIN ROUTE (Requires STRICT Admin powers) === */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>

      <Footer />
    </>
  );
}