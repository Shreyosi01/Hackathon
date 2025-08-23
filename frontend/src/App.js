import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";  // ✅ Import Header
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.new";
import SignupPage from "./pages/Signup";
import FindDoctors from "./pages/FindDoctors";
import ChatBot from './ChatBot';
import HealthReport from "./pages/HealthReport";
import Profile from "./pages/Profile"; 
import Footer from "./components/Footer";
import VideoConsult from "./pages/VideoConsult";
import WellnessLeaderboard from "./pages/Leaderboard";
import Campaigns from "./pages/Campaigns";

function App() {
  return (
    <Router>
      <div className="app-container">
        
        {/* ✅ Header always visible */}
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/video-consult" element={<VideoConsult />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/ai-chatbot" element={<ChatBot />} />
          <Route path="/wellness-leaderboard" element={<WellnessLeaderboard />} />
          <Route path="/health-report" element={<HealthReport />} />
          <Route path="/profile/student" element={<Profile />} />
          <Route path="/profile/doctor" element={<Profile />} />
        </Routes>

        {/* ✅ Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
