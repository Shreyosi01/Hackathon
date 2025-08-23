import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.new";
import SignupPage from "./pages/Signup";
import FindDoctors from "./pages/FindDoctors";
import ChatBot from './ChatBot';
import HealthReport from "./pages/HealthReport";
import Profile from "./pages/Profile"; 
import VideoConsult from "./pages/VideoConsult";
import WellnessLeaderboard from "./pages/Leaderboard";
import Campaigns from "./pages/Campaigns";

import AdminLayout from "./pages/Admin/AdminLayout";
import ReportsList from "./pages/Admin/ReportsList";
import ReportDetail from "./pages/Admin/ReportDetail";
import ReportTrends from "./pages/Admin/ReportTrends";
import ReportsMap from "./pages/Admin/ReportsMap";
import AppointmentsAll from "./pages/Admin/AppointmentsAll";
import CampaignsManage from "./pages/Admin/CampaignsManage";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="app-container">
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

          {/* Doctor Dashboard */}
          <Route path="/doctor" element={<DoctorDashboard />} />

          {/* Admin Layout with Nested Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="reports" element={<ReportsList />} />
            <Route path="reports/:id" element={<ReportDetail />} />
            <Route path="reports/trends" element={<ReportTrends />} />
            <Route path="reports/map" element={<ReportsMap />} />
            <Route path="appointments" element={<AppointmentsAll />} />
            <Route path="campaigns" element={<CampaignsManage />} />
          </Route>

          {/* Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;