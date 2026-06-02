import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      loginUser(res.data);

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else if (res.data.role === "COMPANY") {
        navigate("/company");
      } else {
        navigate("/student");
      }
    } catch {
      setMsg("Login failed. Check email, password or approval status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-login-page">
      <section className="login-showcase">
        <div className="login-showcase-content">
          <span className="login-badge">🚀 CareerConnect Pro</span>

          <h1>Welcome back to your smart career workspace.</h1>

          <p>
            Login to access jobs, applications, resume analysis, company hiring
            tools, admin approvals and placement analytics.
          </p>

          <div className="login-feature-list">
            <div>
              <span>🎓</span>
              <b>Student Dashboard</b>
              <small>Applications, interviews, offers and saved jobs.</small>
            </div>

            <div>
              <span>🏢</span>
              <b>Company Hiring Panel</b>
              <small>Post jobs, manage openings and track hiring.</small>
            </div>

            <div>
              <span>🛡️</span>
              <b>Admin Control Center</b>
              <small>Approve companies, users, jobs and analytics.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="login-form-section">
        <div className="premium-login-card">
          <div className="login-card-head">
            <span className="login-badge light">Welcome Back</span>
            <h2>Login to CareerConnect</h2>
            <p>Enter your credentials to continue your journey.</p>
          </div>

          {msg && <p className="error-msg">{msg}</p>}

          <form onSubmit={submit} className="premium-login-form">
            <label>Email Address</label>
            <input
              placeholder="Enter your email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label>Password</label>
            <div className="password-input-wrap">
              <input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button className="btn login-submit-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="premium-auth-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;