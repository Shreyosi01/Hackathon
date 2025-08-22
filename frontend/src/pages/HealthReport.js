import React, { useState } from 'react';
import './HealthReport.css';

export default function HealthReport() {
  const [location, setLocation] = useState(null);
  const [emergency, setEmergency] = useState(false);
  const [mentalHealth, setMentalHealth] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [photo, setPhoto] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => alert('Location access denied')
      );
    } else {
      alert('Geolocation not supported');
    }
  };

  return (
    <div className="health-report-root">
      <h2>Report Health Issue</h2>
      <p className="subtitle">Help us understand your health concerns</p>
      <div className="health-report-card">
        <div className="emergency-banner">
          <span role="img" aria-label="alert">⚠️</span> Is this an emergency?
        </div>
        <label className="label">Describe your symptoms</label>
        <textarea
          className="input"
          placeholder="Please describe what you are experiencing..."
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
        />
        <div className="checkbox-row">
          <input type="checkbox" id="mentalHealth" checked={mentalHealth} onChange={e => setMentalHealth(e.target.checked)} />
          <label htmlFor="mentalHealth" className="checkbox-label">Mental health related</label>
        </div>
        <div className="location-row">
          <button className="location-btn" onClick={getLocation}>
            <span role="img" aria-label="location">📍</span> Use Current Location
          </button>
          {location && <span className="location-info">Lat: {location.lat}, Lng: {location.lng}</span>}
        </div>
        <div className="photo-upload">
          <label>Add Photo (Optional)</label>
          <div className="photo-box">
            <span role="img" aria-label="camera">📷</span> Tap to add a photo
          </div>
        </div>
      </div>
    </div>
  );
}
