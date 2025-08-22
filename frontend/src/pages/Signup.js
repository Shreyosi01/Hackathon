import React from "react";
import Header from "../components/Header";
import "../components/Header.css";
import "../styles/Signup.css";
import api from "../api";

const roles = ["Student", "Doctor", "Admin"];

export default function SignupPage() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("Student");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({ type: "", text: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" }); // reset message

    try {
      const res = await api.post("/register", {
        full_name: fullName,
        email,
        phone,
        password,
        role,
      });

      console.log("Signup response:", res.data);
      setMessage({ type: "success", text: "✅ Signup successful! You can now login." });

      // Optional redirect after short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      console.error("Signup error:", err);
      setMessage({ type: "error", text: "❌ Signup failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Header />
      <div className="signup-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        {message.text && (
          <div
            className={`signup-message ${message.type === "error" ? "error" : "success"}`}
          >
            {message.text}
          </div>
        )}

        <div className="switch-auth">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}