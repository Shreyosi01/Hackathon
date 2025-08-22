
import React, { useState } from 'react';
import './FindDoctors.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '20px 0'
};


export default function FindDoctors() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from backend
  React.useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch('/api/doctors');
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    }
    fetchDoctors();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setError('Location access denied')
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  return (
    <div className="find-doctors-root">
      <h2>Find Doctors Near You</h2>
      <button className="location-btn" onClick={getLocation}>Use My Location</button>
      {error && <div className="error-msg">{error}</div>}
      {location && (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={14}
          style={containerStyle}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>You are here</Popup>
          </Marker>
          {doctors && doctors.map((doc, idx) => (
            doc.lat && doc.lng && (
              <Marker key={idx} position={[doc.lat, doc.lng]}>
                <Popup>
                  <b>{doc.name}</b><br />
                  {doc.specialty}<br />
                  {doc.address}
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      )}
      <div className="search-bar">
        <input placeholder="Search for doctors, specialties..." />
        <button>Search</button>
      </div>
      {/* Doctor list would go here */}
    </div>
  );
}
