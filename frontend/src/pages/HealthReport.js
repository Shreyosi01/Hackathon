import React, { useState } from 'react';
import axios from 'axios';
import './HealthReport.css';

export default function HealthReport() {
  const [location, setLocation] = useState(null);
  const [emergency, setEmergency] = useState(false);
  const [mentalHealth, setMentalHealth] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setMessage('❌ Location access denied')
      );
    } else {
      setMessage('❌ Geolocation not supported');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // 👈 assuming you save JWT here after login

      const payload = {
        is_emergency: emergency,
        description: symptoms,
        mental_health_related: mentalHealth,
        latitude: location?.lat || null,
        longitude: location?.lng || null,
        photo_url: photo ? photo.name : null // for now just save filename
      };

      const res = await axios.post("http://127.0.0.1:8000/reports/create", payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      setMessage("✅ Report submitted successfully!");
      console.log(res.data);

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit report");
    }
  };
  return (
    <div className="health-report-root">
      <h2>Report Health Issue</h2>
      <p className="subtitle">Help us understand your health concerns</p>
      <form className="health-report-card" onSubmit={handleSubmit}>
        
        <div className="checkbox-row">
          <input type="checkbox" id="emergency" checked={emergency} onChange={e => setEmergency(e.target.checked)} />
          <label htmlFor="emergency" className="checkbox-label">⚠️ Is this an emergency?</label>
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
          <button type="button" className="location-btn" onClick={getLocation}>
            📍 Use Current Location
          </button>
          {location && <span className="location-info">Lat: {location.lat}, Lng: {location.lng}</span>}
        </div>

        <div className="photo-upload">
          <label>Add Photo (Optional)</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
