import React from "react";
import Header from "../components/Header";
import "../components/Header.css";
import { login } from "../services/auth"; // service function

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
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [lang, setLang] = React.useState("EN");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // ✅ only identifier + password
      const token = await login(identifier, password);
      setSuccess("✅ Login successful!");
      console.log("JWT token:", token);

      // save token if needed
      localStorage.setItem("token", token);

      // redirect after short delay
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("❌ Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-center-wrapper">
        <div className="login-demo-top">
          <div className="login-demo-heart">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="36" cy="36" r="36" fill="#EAF3FA" />
              <path
                d="M36 51C35.7 51 35.4 50.9 35.2 50.7L24.2 39.7C21.1 36.6 21.1 31.4 24.2 28.3C25.7 26.8 27.7 26 29.8 26C31.9 26 33.9 26.8 35.4 28.3L36 28.9L36.6 28.3C39.7 25.2 44.9 25.2 48 28.3C51.1 31.4 51.1 36.6 48 39.7L36.8 50.7C36.6 50.9 36.3 51 36 51Z"
                stroke="#4A90E2"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="login-demo-title">{text[lang].title}</div>
          <div className="login-demo-subtitle">{text[lang].subtitle}</div>
        </div>

        <div className="login-card login-centered-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-row login-lang-row" style={{ justifyContent: "flex-end" }}>
              <div className="login-lang" title="Change Language">
                <span role="img" aria-label="globe">🌐</span>
                <select
                  className="lang-select"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  aria-label="Select Language"
                  style={{ marginLeft: 4 }}
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="login-label left" htmlFor="identifier">
              {text[lang].email}
            </label>
            <input
              className="login-input"
              id="identifier"
              type="text"
              placeholder={text[lang].emailPlaceholder}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <label className="login-label left" htmlFor="password">
              {text[lang].password}
            </label>
            <input
              className="login-input"
              id="password"
              type="password"
              placeholder={text[lang].passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="login-btn login-demo-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : text[lang].signIn}
            </button>
          </form>

          {/* Inline messages */}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

          <div className="switch-auth">
            {text[lang].signupPrompt} <a href="/signup">{text[lang].signup}</a>
          </div>

          <div className="login-footer login-demo-footer">{text[lang].footer}</div>
        </div>
      </div>
    </div>
  );
}