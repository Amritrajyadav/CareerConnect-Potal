import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardLayout({ title, subtitle, children }) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  const studentLinks = [
    { path: "/student", label: "Overview", icon: "📊" },
    { path: "/jobs", label: "Browse Jobs", icon: "💼" },
    { path: "/student-profile", label: "Resume & Profile", icon: "📄" },
    { path: "/resume-analyzer", label: "AI Resume Analyzer", icon: "🤖" },
    { path: "/notifications", label: "Notifications", icon: "🔔" },
  ];

  const companyLinks = [
    { path: "/company", label: "HR Overview", icon: "🏢" },
    { path: "/company-profile", label: "Company Profile", icon: "🧾" },
    { path: "/applicants", label: "Applicants", icon: "👥" },
    { path: "/jobs", label: "All Jobs", icon: "💼" },
    { path: "/notifications", label: "Notifications", icon: "🔔" },
  ];

  const adminLinks = [
    { path: "/admin", label: "Admin Center", icon: "🛡️" },
    { path: "/jobs", label: "Jobs", icon: "💼" },
    { path: "/applicants", label: "Applications", icon: "📥" },
    { path: "/notifications", label: "Notifications", icon: "🔔" },
  ];

  const links =
    user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "COMPANY"
      ? companyLinks
      : studentLinks;

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <span>C</span>
          <div>
            <b>CareerConnect</b>
            <small>{user?.role || "USER"} Panel</small>
          </div>
        </div>

        <div className="dash-profile">
          <div className="avatar">{user?.fullName?.charAt(0) || "U"}</div>
          <div>
            <b>{user?.fullName || "User"}</b>
            <small>{user?.email}</small>
          </div>
        </div>

        <nav className="dash-nav">
          {links.map((link) => (
            <NavLink to={link.path} key={link.path}>
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <section className="dash-main">
        <header className="dash-topbar">
          <div>
            <p className="eyebrow">{user?.role} Dashboard</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="dash-top-actions">
            <span className="user-chip">{user?.role}</span>
            <button
              className="icon-btn"
              onClick={() => document.body.classList.toggle("dark")}
            >
              🌙
            </button>
          </div>
        </header>

        {children}
      </section>
    </div>
  );
}

export default DashboardLayout;