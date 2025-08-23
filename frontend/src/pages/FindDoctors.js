
import React, { useState, useMemo } from 'react';
import './FindDoctors.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const mockDoctors = [
  { name: "Dr. Asha Mehra", specialty: "Cardiologist", rating: 4.8, location: "Delhi", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Rajiv Singh", specialty: "Dermatologist", rating: 4.5, location: "Mumbai", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Dr. Priya Nair", specialty: "Pediatrician", rating: 4.7, location: "Bangalore", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Dr. Amit Patel", specialty: "Orthopedic", rating: 4.2, location: "Kolkata", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Dr. Sunita Rao", specialty: "Gynecologist", rating: 4.9, location: "Chennai", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
];

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '20px 0'
};


export default function FindDoctors() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState(mockDoctors);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");

  // If you want to fetch from backend, replace mockDoctors above and uncomment below
  // React.useEffect(() => {
  //   async function fetchDoctors() {
  //     try {
  //       const res = await fetch('/api/doctors');
  //       const data = await res.json();
  //       setDoctors(data);
  //     } catch (err) {
  //       console.error('Error fetching doctors:', err);
  //     }
  //   }
  //   fetchDoctors();
  // }, []);

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

  // Get unique specialties and cities for filters
  const specialties = useMemo(() => Array.from(new Set(mockDoctors.map(d => d.specialty).filter(Boolean))), []);
  const cities = useMemo(() => Array.from(new Set(mockDoctors.map(d => d.location || d.city).filter(Boolean))), []);

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    return doctors.filter(d => {
      const matchesSearch = search === "" || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty?.toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty = !specialty || d.specialty === specialty;
      const matchesCity = !city || d.location === city || d.city === city;
      return matchesSearch && matchesSpecialty && matchesCity;
    });
  }, [doctors, search, specialty, city]);

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
          {filteredDoctors && filteredDoctors.map((doc, idx) => (
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
      <div className="search-bar doctors-search-bar">
        <input
          className="doctor-search-input"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="doctor-search-select"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          {specialties.map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          className="doctor-search-select"
          value={city}
          onChange={e => setCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="doctors-grid">
        {filteredDoctors.length === 0 ? (
          <div style={{textAlign: 'center', width: '100%', color: '#6b7280', margin: '2rem 0'}}>No doctors found.</div>
        ) : (
          filteredDoctors.map((d) => (
            <div key={d.name} className="doctor-card">
              <img src={d.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"} alt={d.name} className="doctor-avatar" />
              <h3 className="doctor-name">{d.name}</h3>
              <div className="doctor-specialty">{d.specialty}</div>
              <div className="doctor-location">{d.location || d.city}</div>
              <button
                className="contact-button"
                aria-label={`Contact ${d.name}`}
                onClick={() => window.open(`mailto:team@caresync.com?subject=Contact%20${encodeURIComponent(d.name)}`)}
              >
                Contact
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
