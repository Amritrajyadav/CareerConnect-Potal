import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [msg, setMsg] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await API.post("/password/forgot", {
        email: form.email,
      });

      setMsg(res.data.message || "OTP sent successfully.");
      setStep(2);
    } catch {
      setMsg("Email not found.");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await API.post("/password/reset", form);
      setMsg(res.data.message || "Password reset successful.");
    } catch {
      setMsg("Invalid OTP or OTP expired.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card premium-auth">
        <span className="premium-badge">Secure Account Recovery</span>

        <h1>Forgot Password</h1>

        <p>
          Reset your password using a 6-digit OTP. In development mode, OTP will
          be printed in the Spring Boot terminal.
        </p>

        {msg && <p className="message">{msg}</p>}

        {step === 1 && (
          <form onSubmit={sendOtp}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter registered email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <button className="btn full-btn">Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={resetPassword}>
            <label>OTP</label>
            <input
              placeholder="Enter 6-digit OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              required
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              required
            />

            <button className="btn full-btn">Reset Password</button>
          </form>
        )}

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;