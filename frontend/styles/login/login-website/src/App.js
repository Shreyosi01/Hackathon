
import LoginPracto from './pages/LoginPracto';
import HomePracto from './pages/HomePracto';
import './styles/LoginPracto.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPracto />} />
        <Route path="/home" element={<HomePracto />} />
      </Routes>
    </Router>
  );
}

export default App;
