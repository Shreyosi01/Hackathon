import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const languages = [
  { code: "EN", label: "English" },
  { code: "HI", label: "हिन्दी" },
];

const text = {
  EN: {
    title: "HH308 Health Platform",
    subtitle: "Connect. Care. Heal.",
    email: "Email or Phone",
    emailPlaceholder: "Enter your email or phone",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    footer: "Connecting Communities for Better Health",
    signupPrompt: "Don’t have an account?",
    signup: "Sign up here",
  },
  HI: {
    title: "HH308 स्वास्थ्य प्लेटफ़ॉर्म",
    subtitle: "जुड़ें। देखभाल करें। स्वस्थ रहें।",
    email: "ईमेल या फ़ोन",
    emailPlaceholder: "अपना ईमेल या फ़ोन दर्ज करें",
    password: "पासवर्ड",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    signIn: "साइन इन करें",
    footer: "बेहतर स्वास्थ्य के लिए समुदायों को जोड़ना",
    signupPrompt: "क्या आपका खाता नहीं है?",
    signup: "यहां साइन अप करें",
  },
};

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("EN");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  // Handle form submit (Login process)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        identifier,
        password,
      });

      // Expected API response: { access_token, role: "doctor"/"student" }
      const { access_token, role } = response.data;

      // Save token & role for authentication persistence
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);

      setIsError(false);
      setMessage("✅ Login successful! Redirecting...");

      // Redirect to proper dashboard based on role
      setTimeout(() => {
        const userRole = role?.toLowerCase(); // normalize
        if (userRole === "doctor") {
  navigate("/doctor");
} else if (userRole === "admin") {
  navigate("/admin");
} else {
  navigate("/home");
}
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
      setIsError(true);
      setMessage("❌ Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-center-wrapper">
        <div className="login-card login-centered-card">

          {/* Logo + Title + Subtitle */}
          <div className="login-demo-top">
            <div className="login-demo-title">{text[lang].title}</div>
            <div className="login-demo-subtitle">{text[lang].subtitle}</div>
          </div>

          {/* Language Selector */}
          <div className="login-lang-row">
            <select
              className="lang-select small"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {languages.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">{text[lang].email}</label>
            <input
              className="login-input"
              type="text"
              placeholder={text[lang].emailPlaceholder}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <label className="login-label">{text[lang].password}</label>
            <input
              className="login-input"
              type="password"
              placeholder={text[lang].passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="login-btn login-demo-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : text[lang].signIn}
            </button>
          </form>

          {/* Success/Error Message */}
          {message && (
            <p
              className={`login-message ${
                isError ? "error-message" : "success-message"
              }`}
            >
              {message}
            </p>
          )}

          {/* Signup Link + Footer */}
          <div className="switch-auth">
            {text[lang].signupPrompt} <a href="/signup">{text[lang].signup}</a>
          </div>
          <div className="login-footer">{text[lang].footer}</div>
        </div>
      </div>
    </div>
  );
}