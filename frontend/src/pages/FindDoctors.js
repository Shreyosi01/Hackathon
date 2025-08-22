import React, { useState } from 'react';
import './FindDoctors.css';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

export default function FindDoctors() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  });

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
      {isLoaded && location && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={14}
        >
          <Marker position={location} />
        </GoogleMap>
      )}
      <div className="search-bar">
        <input placeholder="Search for doctors, specialties..." />
        <button>Search</button>
      </div>
      {/* Doctor list would go here */}
    </div>
  );
}
