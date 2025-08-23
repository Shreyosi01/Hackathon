import React from "react";
import "../styles/Signup.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

const roles = ["Student", "Doctor", "Admin"];

export default function SignupPage() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("Student");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/register", {
        full_name: fullName,
        email,
        phone,
        password,
        role,
      });

      setMessage("✅ Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("❌ Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-center-wrapper">
        <div className="signup-card">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">Join CareSync today</p>

          <form className="signup-form" onSubmit={handleSignup}>
            <label className="signup-label">Full Name</label>
            <input
              className="signup-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label className="signup-label">Email</label>
            <input
              className="signup-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="signup-label">Phone</label>
            <input
              className="signup-input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label className="signup-label">Password</label>
            <input
              className="signup-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="signup-label">Role</label>
            <select
              className="signup-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Signup"}
            </button>
          </form>

          {message && <p className="signup-message">{message}</p>}

          <div className="signup-footer">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
