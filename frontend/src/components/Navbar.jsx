import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  const handleLogout = () => {
    logoutUser();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="premium-navbar">
      <Link to="/" className="premium-brand" onClick={closeMenu}>
        <img
          src="/logo.png"
          alt="CareerConnect Logo"
          className="brand-logo"
        />

        <div>
          <strong>CareerConnect</strong>
          <small>with AI Hiring</small>
        </div>
      </Link>

      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`premium-nav-center ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/jobs" onClick={closeMenu}>
          Jobs
        </NavLink>

        {user?.role === "STUDENT" && (
          <>
            <NavLink to="/student" onClick={closeMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/student-profile" onClick={closeMenu}>
              Profile
            </NavLink>
            <NavLink to="/resume-analyzer" onClick={closeMenu}>
              AI Resume
            </NavLink>
          </>
        )}

        {user?.role === "COMPANY" && (
          <>
            <NavLink to="/company" onClick={closeMenu}>
              HR Panel
            </NavLink>
            <NavLink to="/company-profile" onClick={closeMenu}>
              Company
            </NavLink>
            <NavLink to="/applicants" onClick={closeMenu}>
              Applicants
            </NavLink>
          </>
        )}

        {user?.role === "ADMIN" && (
          <NavLink to="/admin" onClick={closeMenu}>
            Admin
          </NavLink>
        )}
      </div>

      <div className={`premium-nav-actions ${menuOpen ? "open" : ""}`}>
        {user && <NotificationBell />}

        <button className="nav-round-btn" onClick={toggleDark} title="Theme">
          🌙
        </button>

        {!user ? (
          <>
            <Link to="/login" className="nav-login-btn" onClick={closeMenu}>
              Login
            </Link>

            <Link to="/register" className="nav-cta-btn" onClick={closeMenu}>
              Get Started
            </Link>
          </>
        ) : (
          <>
            <div className="nav-user-card">
              <span>{user?.fullName?.charAt(0) || "U"}</span>
              <div>
                <b>{user?.fullName || "User"}</b>
                <small>{user?.role}</small>
              </div>
            </div>

            <button className="nav-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;