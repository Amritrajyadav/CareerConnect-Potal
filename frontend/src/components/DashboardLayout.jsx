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

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
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

  const workspaceLabel =
    user?.role === "ADMIN"
      ? "Platform Control Center"
      : user?.role === "COMPANY"
      ? "Recruiter Hiring Workspace"
      : "Student Career Workspace";

  return (
    <div className="premium-dash-shell">
      <aside className="premium-dash-sidebar">
        <div className="dash-glow"></div>

        <div className="premium-dash-brand">
          <div className="premium-dash-logo">C</div>

          <div>
            <h2>CareerConnect</h2>
            <p>AI Recruitment SaaS</p>
          </div>
        </div>

        <div className="premium-user-panel">
          <div className="premium-avatar">
            {user?.fullName?.charAt(0) || "U"}
            <span></span>
          </div>

          <div>
            <h3>{user?.fullName || "User"}</h3>
            <p>{user?.email || "user@email.com"}</p>
            <small>{user?.role || "USER"} • Online</small>
          </div>
        </div>

        <div className="workspace-card">
          <span>🚀</span>
          <div>
            <b>{workspaceLabel}</b>
            <p>Premium SaaS Dashboard</p>
          </div>
        </div>

        <nav className="premium-dash-nav">
          {links.map((link) => (
            <NavLink to={link.path} key={link.path}>
              <span>{link.icon}</span>
              <b>{link.label}</b>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-upgrade-card">
          <span>✨</span>
          <h4>CareerConnect Pro</h4>
          <p>Smart hiring, AI resume scoring and placement analytics.</p>
        </div>

        <button className="premium-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="premium-dash-main">
        <header className="premium-dash-topbar">
          <div className="topbar-left">
            <p className="eyebrow">{workspaceLabel}</p>

            <h1>
              {getGreeting()}, {user?.fullName?.split(" ")[0] || "User"} 👋
            </h1>

            <p>{subtitle || title}</p>
          </div>

          <div className="topbar-center">
            <input
              type="text"
              placeholder="Search jobs, users, companies..."
              onFocus={(e) => (e.target.placeholder = "Search is UI-only for now")}
              onBlur={(e) =>
                (e.target.placeholder = "Search jobs, users, companies...")
              }
            />
          </div>

          <div className="topbar-actions">
            <NotificationBell />

            <button
              className="topbar-icon-btn"
              onClick={() => document.body.classList.toggle("dark")}
              title="Toggle theme"
            >
              🌙
            </button>

            <span className="premium-role-chip">{user?.role || "USER"}</span>
          </div>
        </header>

        <section className="dashboard-title-strip">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <div className="live-status">
            <span></span>
            Live Workspace
          </div>
        </section>

        <section className="premium-dash-content">{children}</section>
      </main>
    </div>
  );
}

export default DashboardLayout;