import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="pro-navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">C</span>
        <div>
          <strong>CareerConnect</strong>
          <small>Pro</small>
        </div>
      </Link>

      <div className="nav-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>

        {user?.role === "STUDENT" && (
          <>
            <NavLink to="/student">Dashboard</NavLink>
            <NavLink to="/student-profile">Profile</NavLink>
          </>
        )}

        {user?.role === "COMPANY" && (
          <>
            <NavLink to="/company">HR Panel</NavLink>
            <NavLink to="/company-profile">Company</NavLink>
            <NavLink to="/applicants">Applicants</NavLink>
          </>
        )}

        {user?.role === "ADMIN" && <NavLink to="/admin">Admin</NavLink>}
      </div>

      <div className="nav-actions">
        <NotificationBell />

        <button className="icon-btn" onClick={toggleDark} title="Toggle theme">
          🌙
        </button>

        {!user ? (
          <>
            <Link to="/login" className="btn secondary">
              Login
            </Link>
            <Link to="/register" className="btn">
              Get Started
            </Link>
          </>
        ) : (
          <>
            <span className="user-chip">{user.role}</span>
            <button className="btn danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;