


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.new';
import FindDoctors from './pages/FindDoctors';
import AIChatbot from './pages/AIChatbot';
import WellnessLeaderboard from './pages/WellnessLeaderboard';
import HealthReport from './pages/HealthReport';
import Footer from './components/Footer';
// import './pages/HomePage.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/find-doctors" element={<FindDoctors />} />
  <Route path="/video-consult" element={<div style={{ padding: '3rem', textAlign: 'center', fontSize: '2rem' }}>Video Consult (Coming Soon)</div>} />
  <Route path="/ai-chatbot" element={<AIChatbot />} />
  <Route path="/wellness-leaderboard" element={<WellnessLeaderboard />} />
  <Route path="/health-report" element={<HealthReport />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
