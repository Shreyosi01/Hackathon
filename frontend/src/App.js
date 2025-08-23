import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.new";
import SignupPage from "./pages/Signup";
import FindDoctors from "./pages/FindDoctors";
import ChatBot from './ChatBot';
import WellnessLeaderboard from "./pages/WellnessLeaderboard";
import HealthReport from "./pages/HealthReport";
import Profile from "./pages/Profile"; // ✅ added
import Footer from "./components/Footer";
import VideoConsult from "./pages/VideoConsult";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/video-consult" element={<VideoConsult />} />
          <Route
            path="/video-consult"
            element={
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  fontSize: "2rem",
                }}
              >
                Video Consult (Coming Soon)
              </div>
            }
          />
          <Route path="/ai-chatbot" element={<ChatBot />} />
          <Route path="/wellness-leaderboard" element={<WellnessLeaderboard />} />
          <Route path="/health-report" element={<HealthReport />} />
          <Route path="/profile/student" element={<Profile />} />
          <Route path="/profile/doctor" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
