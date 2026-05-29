import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

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
    { path: "/student-profile", label: "Profile", icon: "👤" },
    { path: "/resume-analyzer", label: "AI Resume", icon: "🤖" },
    { path: "/notifications", label: "Notifications", icon: "🔔" },
  ];

  const companyLinks = [
    { path: "/company", label: "HR Overview", icon: "🏢" },
    { path: "/company-profile", label: "Company", icon: "🧾" },
    { path: "/applicants", label: "Applicants", icon: "👥" },
    { path: "/jobs", label: "Jobs", icon: "💼" },
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
    <div className="saas-shell">
      <aside className="saas-sidebar">
        <div className="saas-brand">
          <div className="saas-brand-icon">C</div>
          <div>
            <h2>CareerConnect</h2>
            <p>{user?.role || "USER"} Workspace</p>
          </div>
        </div>

        <div className="saas-user-card">
          <div className="saas-avatar">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div>
            <h4>{user?.fullName || "User"}</h4>
            <p>{user?.email || "user@email.com"}</p>
          </div>
        </div>

        <nav className="saas-nav">
          {links.map((link) => (
            <NavLink to={link.path} key={link.path}>
              <span>{link.icon}</span>
              <b>{link.label}</b>
            </NavLink>
          ))}
        </nav>

        <button className="saas-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="saas-main">
        <header className="saas-topbar">
          <div>
            <p className="eyebrow">{user?.role} Dashboard</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="saas-top-actions">
            <NotificationBell />

            <button
              className="icon-btn"
              onClick={() => document.body.classList.toggle("dark")}
            >
              🌙
            </button>

            <span className="user-chip">{user?.role}</span>
          </div>
        </header>

        <section className="saas-content">{children}</section>
      </main>
    </div>
  );
}

export default DashboardLayout;