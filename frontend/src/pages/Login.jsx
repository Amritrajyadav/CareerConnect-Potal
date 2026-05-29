import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

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
      setMsg("Login failed. Check email or password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card premium-auth">
        <span className="premium-badge">Welcome Back</span>

        <h1>Login</h1>

        <p>Access your dashboard, jobs, applications and smart career tools.</p>

        {msg && <p className="error-msg">{msg}</p>}

        <form onSubmit={submit}>
          <label>Email</label>
          <input
            placeholder="Enter email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            placeholder="Enter password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="btn full-btn" type="submit">
            Login
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;