import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Jobs from "./pages/Jobs";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Notifications from "./pages/Notifications";

import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyProfile from "./pages/CompanyProfile";
import Applicants from "./pages/Applicants";

import AdminDashboard from "./pages/AdminDashboard";

import CompanyPublicPage from "./pages/CompanyPublicPage";
import StudentPublicPage from "./pages/StudentPublicPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <main className="page">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            <Route path="/company-public/:id" element={<CompanyPublicPage />} />
            <Route path="/student-public/:id" element={<StudentPublicPage />} />
            

            {/* Shared Protected Routes */}
            <Route
              path="/jobs"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "COMPANY", "ADMIN"]}>
                  <Jobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "COMPANY", "ADMIN"]}>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student-profile"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/resume-analyzer"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <ResumeAnalyzer />
                </ProtectedRoute>
              }
            />

            {/* Company / HR Routes */}
            <Route
              path="/company"
              element={
                <ProtectedRoute allowedRoles={["COMPANY"]}>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/company-profile"
              element={
                <ProtectedRoute allowedRoles={["COMPANY"]}>
                  <CompanyProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applicants"
              element={
                <ProtectedRoute allowedRoles={["COMPANY", "ADMIN"]}>
                  <Applicants />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={
                <div className="dashboard">
                  <div className="card">
                    <h2>Page not found</h2>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;